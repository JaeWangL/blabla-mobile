import axios from 'axios';
import { apiKeys } from '../configs/api_keys';
import { UploadedThumbnailDTO } from '../dtos/upload_dtos';

const uploadInstance = axios.create({
  baseURL: apiKeys.uploadDomain,
  timeout: 10000,
});

export const uploadThumbnail = async (
  fileUri: string,
  handlePercentage?: (percent: number) => void,
): Promise<UploadedThumbnailDTO | undefined> => {
  const formData = new FormData();
  const filename = fileUri.split('/').pop();
  const match = /\.(\w+)$/.exec(filename!);
  const type = match ? `image/${match[1]}` : `image`;
  formData.append('file', {
    // @ts-ignore
    uri: fileUri,
    name: filename,
    type,
  });

  const res = await fetch(`${apiKeys.uploadDomain}thumbnail`, {
    body: formData,
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  if (!res.ok) {
    return undefined;
  }

  return await res.json();

  // TODO: Change to 'axios' from 'fetch'
  /*
  const res = await uploadInstance.post<UploadedThumbnailDTO>('thumbnail', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      // 'Content-Type': `multipart/form-data; boundary=${new Date().getMilliseconds()}`,
    },
    onUploadProgress: handlePercentage
      ? (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          handlePercentage(percentCompleted);
        }
      : undefined,
  });
  return res.data;
  */
};
