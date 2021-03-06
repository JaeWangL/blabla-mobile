import * as ImagePicker from 'expo-image-picker';
import { memo, useCallback, useEffect, useState } from 'react';
import IsEqual from 'react-fast-compare';
import { ActivityIndicator, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AnimatedImage, Badge, Incubator, Text, View, TouchableOpacity } from 'react-native-ui-lib';
import { useRecoilValue } from 'recoil';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation, CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import IcClose from '@assets/icons/ic_close.png';
import ThumbnailPlaceholder from '@assets/images/thumbnail_placeholder_upload.png';
import CustomAppBar from '@/components/customAppbar';
import Divider from '@/components/divider';
import KeyboardAwareScrollView from '@/components/keyboardAwareScrollView';
import { ArchivesParamsList, PermissionedParamsList } from '@/configs/screen_types';
import { CreatePostRequest } from '@/dtos/post_dtos';
import { locationAtom } from '@/recoils/location_states';
import { createPost } from '@/services/posts_service';
import { uploadThumbnail } from '@/services/upload_service';
import { getDeviceInfo } from '@/helpers/device_utils';
import { translate } from '@/i18n';
import { defaultTheme } from '@/themes';
import { initThumbnail, Thumbnail } from './interfaces';
import { styles } from './styles';

const { TextField } = Incubator;

type ScreenNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<PermissionedParamsList, any>,
  StackNavigationProp<ArchivesParamsList>
>;

function PostWrite(): JSX.Element {
  const locations = useRecoilValue(locationAtom);
  const navigation = useNavigation<ScreenNavigationProps>();
  const [thumbnail, setThumbnail] = useState<Thumbnail>(initThumbnail);
  const [uploadPercentage, setPercentage] = useState(0);
  const [title, setTitle] = useState<string>('');
  const [contents, setContents] = useState<string>('');
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      setThumbnail(initThumbnail);
      setPercentage(0);
      setTitle('');
      setContents('');
    };
  }, []);

  const handleImagePicked = useCallback(async (pickerResult: ImagePicker.ImagePickerResult): Promise<void> => {
    try {
      if (pickerResult.cancelled) {
        return;
      }

      // Handle 'percentage' with 'axios'
      setPercentage(20);
      const uploadResponse = await uploadThumbnail(pickerResult.uri, setPercentage);
      if (uploadResponse) {
        setThumbnail({ thumbnailUrl: uploadResponse.thumbnailUrl, originalFileName: uploadResponse.origianlFileName });
      } else {
        Alert.alert(translate('dialogs.uploadErrorTitle'), translate('dialogs.uploadErrorExceed'), [
          { text: translate('common.ok') },
        ]);
      }
    } catch (e) {
      Alert.alert(
        translate('dialogs.uploadErrorTitle'),
        'Error occured when uploading image. Try again later please.',
        [{ text: translate('common.ok') }],
      );
    } finally {
      setPercentage(0);
    }
  }, []);

  const onThumbnailPress = useCallback(async (): Promise<void> => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(translate('dialogs.permissionDeniedTitle'), translate('dialogs.permissionRequestPhotos'), [
        { text: translate('common.ok') },
      ]);
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [1, 1],
      quality: 1,
    });

    handleImagePicked(result);
  }, []);

  const renderRightBarItem = useCallback((): JSX.Element => {
    const onWritePress = async (): Promise<void> => {
      if (isLoading) {
        return;
      }
      const device = await getDeviceInfo();
      if (!device) {
        return;
      }

      setLoading(true);
      try {
        const req: CreatePostRequest = {
          deviceType: device.deviceType,
          deviceId: device.deviceId,
          latitude: locations.latitude,
          longitude: locations.longitude,
          title,
          contents,
          thumbnailUrl: thumbnail.thumbnailUrl,
          originalFileName: thumbnail.originalFileName,
        };
        const res = await createPost(req);
        if (res) {
          Alert.alert(translate('dialogs.postCreatingSucceedTitle'), translate('dialogs.postCreatingSucceed'));
          navigation.goBack();
        } else {
          Alert.alert(translate('dialogs.postCreatingFailedTitle'), translate('dialogs.postCreatingFailed'));
        }
      } catch (e) {
        Alert.alert(translate('dialogs.postCreatingFailedTitle'), translate('dialogs.postCreatingFailed'));
      } finally {
        setLoading(false);
      }
    };

    return (
      <Text style={styles.writeButton} onPress={onWritePress}>
        ??????
      </Text>
    );
  }, [locations, title, contents, thumbnail]);

  return (
    <SafeAreaView style={styles.wrapper}>
      <KeyboardAwareScrollView useScroll>
        <>
          <CustomAppBar title="?????? ?????? ?????????" goBack accessoryRight={renderRightBarItem()} />
          <View style={styles.contentContainer}>
            <TouchableOpacity onPress={onThumbnailPress}>
              <View style={styles.thumbnailContainer}>
                {thumbnail.thumbnailUrl ? (
                  <View>
                    <AnimatedImage
                      style={[styles.thumbnail, styles.withBorderRadius]}
                      source={{ uri: thumbnail.thumbnailUrl }}
                    />
                    <Badge
                      backgroundColor={defaultTheme.primary}
                      style={styles.thumbnailRemoveBadge}
                      icon={IcClose}
                      iconStyle={styles.thumbnailCloseIcon}
                      size={20}
                    />
                  </View>
                ) : (
                  <Image style={styles.thumbnail} source={ThumbnailPlaceholder} />
                )}
                {uploadPercentage !== 0 ? <ActivityIndicator style={styles.thumbnailLoader} /> : null}
              </View>
            </TouchableOpacity>
            <Divider />
            <TextField
              containerStyle={styles.inputContainer}
              placeholderTextColor={defaultTheme.descDefault}
              placeholder="????????? ????????? ?????????."
              enableErrors
              validate={['required']}
              validationMessage={['Field is required', 'Email is invalid', 'Password is too short']}
              value={title}
              onChangeText={setTitle}
            />
            <Divider />
            <TextField
              containerStyle={styles.inputContainer}
              placeholderTextColor={defaultTheme.descDefault}
              placeholder="????????? ????????? ?????????."
              multiline
              enableErrors
              validate={['required']}
              validationMessage={['Field is required']}
              value={contents}
              onChangeText={setContents}
            />
            <Text style={styles.caption}>
              {`
???????????? ?????? ???????????? ????????? ????????????,
???????????? ?????????????????? 24?????? ?????? ???????????? ???????????????.
          
??????????????? ???????????? ????????? ?????? ????????????.`}
            </Text>
          </View>
        </>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default memo(PostWrite, IsEqual);
