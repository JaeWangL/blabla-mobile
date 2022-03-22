import { memo } from 'react';
import IsEqual from 'react-fast-compare';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View } from 'react-native-ui-lib';
import CustomAppBar from '@/components/customAppbar';
import { styles } from './styles';

function InfoDevelopers(): JSX.Element {
  return (
    <SafeAreaView style={styles.wrapper}>
      <CustomAppBar title="설정으로 가기" goBack />
      <View style={styles.textWrapper}>
        <Text style={styles.text}>
          {`
- 이재왕 <jnso5072@outlook.kr>
- 지웅재 <93y0916@naver.com>
- 이봉주 <lostinsf1984@gmail.com>
`}
        </Text>
      </View>
    </SafeAreaView>
  );
}

export default memo(InfoDevelopers, IsEqual);
