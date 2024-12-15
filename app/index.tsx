import styled from 'styled-components/native';
import { router } from 'expo-router';
import colors from '@/colors';
import { Ionicons } from '@expo/vector-icons';

const View = styled.View`
  flex: 1;
  padding: 100px 0 0 30px;
  background-color: ${colors.bgColor};
`;
const Title = styled.Text`
  color: ${colors.textColor};
  font-size: 38px;
  margin-bottom: 100px;
`;
const Btn = styled.TouchableOpacity`
  position: absolute;
  bottom: 50px;
  right: 50px;
  height: 80px;
  width: 80px;
  border-radius: 40px;
  justify-content: center;
  align-items: center;
  background-color: ${colors.btnColor};
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
`;
const BtnText = styled.Text`
  color: white;
`;

export default function Home() {
  return (
    <View>
      <Title>My journal</Title>
      <Btn onPress={() => router.navigate('/write')}>
        <Ionicons name={'add'} color="white" size={40} />
      </Btn>
    </View>
  );
}
