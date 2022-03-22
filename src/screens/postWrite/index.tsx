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
        Alert.alert('Upload Error', 'Maximum file size is exceeded.', [{ text: 'OK' }]);
      }
    } catch (e) {
      Alert.alert('Upload Error', 'Error occured when uploading image. Try again later please.', [{ text: 'OK' }]);
    } finally {
      setPercentage(0);
    }
  }, []);

  const onThumbnailPress = useCallback(async (): Promise<void> => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'You have to accept photos permissions.', [{ text: 'OK' }]);
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
          Alert.alert('Post Created', 'New post are created successfully');
          navigation.goBack();
        } else {
          Alert.alert('Creation Failed', 'Error is occured when writing post. Please try again later.');
        }
      } catch (e) {
        Alert.alert('Creation Failed', 'Error is occured when writing post. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    return (
      <Text style={styles.writeButton} onPress={onWritePress}>
        완료
      </Text>
    );
  }, [locations, title, contents, thumbnail]);

  return (
    <SafeAreaView style={styles.wrapper}>
      <CustomAppBar title="나의 소식 전하기" goBack accessoryRight={renderRightBarItem()} />
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
          placeholder="제목을 입력해 주세요."
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
          placeholder="내용을 입력해 주세요."
          multiline
          enableErrors
          validate={['required']}
          validationMessage={['Field is required']}
          value={contents}
          onChangeText={setContents}
        />
        <Text style={styles.caption}>
          {`
휴대폰의 위치 기반으로 소식이 전해지며,
게시글은 작성일로부터 24시간 후에 자동으로 삭제됩니다.
          
개인정보가 노출되지 않도록 주의 바랍니다.`}
        </Text>
      </View>
    </SafeAreaView>
  );
}

export default memo(PostWrite, IsEqual);
