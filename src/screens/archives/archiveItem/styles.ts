import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  wrapper: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
    marginBottom: 20,
  },
  imageContainer: {
    position: 'relative',
  },
  thumbnailImage: {
    width: '100%',
    height: 200,
  },
  thumbnailAddress: {
    position: 'absolute',
    backgroundColor: '#333',
    bottom: 10,
    color: '#fff',
    paddingBottom: 15,
    paddingTop: 15,
    paddingRight: 20,
    paddingLeft: 20,
    fontSize: 18,
  },
  contentsContainer: {
    flex: 1,
    paddingTop: 10,
    marginHorizontal: 12,
  },
  title: {
    fontSize: 20,
  },
  contents: {
    paddingTop: 16,
    fontSize: 16,
  },
});
