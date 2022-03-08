import * as ImagePicker from 'expo-image-picker';
import { memo, useCallback, useEffect, useState } from 'react';
import IsEqual from 'react-fast-compare';
import { Alert, Button, Image, Text, TouchableOpacity, View } from 'react-native';
import { Incubator } from 'react-native-ui-lib';
import { useRecoilValue } from 'recoil';
import { CreatePostRequest } from '@/dtos/post_dtos';
import { locationAtom } from '@/recoils/location_states';
import { createPost } from '@/services/posts_service';
import { uploadThumbnail } from '@/services/upload_service';
import { getDeviceInfo } from '@/helpers/device_utils';
import { styles } from './styles';

const { TextField } = Incubator;

function PostWrite(): JSX.Element {
  const locations = useRecoilValue(locationAtom);
  const [thumbnail, setThumbnail] = useState('');
  const [uploadPercentage, setPercentage] = useState(0);
  const [title, setTitle] = useState<string>('');
  const [contents, setContents] = useState<string>('');
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      setThumbnail('');
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
        setPercentage(100);
        setThumbnail(uploadResponse.thumbnailUrl);
      } else {
        setPercentage(0);
        Alert.alert('Upload Error', 'Maximum file size is exceeded.', [{ text: 'OK' }]);
      }
    } catch (e) {
      setPercentage(0);
      Alert.alert('Upload Error', 'Error occured when uploading image. Try again later please.', [{ text: 'OK' }]);
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

  const onWritePress = useCallback(async (): Promise<void> => {
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
      };
      const res = await createPost(req);
      if (res) {
        Alert.alert('Post Created', 'New post are created successfully');
      } else {
        Alert.alert('Creation Failed', 'Error is occured when writing post. Please try again later.');
      }
    } catch (e) {
      Alert.alert('Creation Failed', 'Error is occured when writing post. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [title, contents, thumbnail]);

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={onThumbnailPress}>
        {thumbnail ? <Image style={styles.thumbnail} source={{ uri: thumbnail }} /> : <Text>Select Herer</Text>}
      </TouchableOpacity>
      <TextField
        placeholder="Title"
        floatingPlaceholder
        enableErrors
        validate={['required']}
        validationMessage={['Field is required', 'Email is invalid', 'Password is too short']}
        value={title}
        onChangeText={setTitle}
      />
      <TextField
        placeholder="Contents"
        floatingPlaceholder
        multiline
        enableErrors
        validate={['required']}
        validationMessage={['Field is required']}
        value={contents}
        onChangeText={setContents}
      />
      <Button title={isLoading ? 'Loading' : 'Write'} onPress={onWritePress} />
    </View>
  );
}

export default memo(PostWrite, IsEqual);
