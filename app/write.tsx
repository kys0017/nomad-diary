import styled from 'styled-components/native';
import colors from '@/colors';
import { useState } from 'react';
import { Alert } from 'react-native';
import { useRealm } from '@realm/react';
import Feeling from '@/schema/feeling';
import { BSON } from 'realm';
import { useRouter } from 'expo-router';

const View = styled.View`
  background-color: ${colors.bgColor};
  flex: 1;
  padding: 0 30px;
`;
const Title = styled.Text`
  color: ${colors.textColor};
  margin: 50px 0;
  text-align: center;
  font-size: 28px;
  font-weight: 500;
`;
const TextInput = styled.TextInput`
  background-color: white;
  border-radius: 20px;
  padding: 10px 20px;
  font-size: 18px;
`;
const Btn = styled.TouchableOpacity`
  width: 100%;
  margin-top: 30px;
  background-color: ${colors.btnColor};
  padding: 10px 20px;
  align-items: center;
  border-radius: 20px;
`;
const BtnText = styled.Text`
  color: white;
  font-weight: 500;
  font-size: 18px;
`;
const Emotions = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
`;
const Emotion = styled.TouchableOpacity<{ selected: boolean }>`
  background-color: white;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
  padding: 10px;
  border-radius: 10px;
  border-width: ${props => (props.selected ? '2px' : '0px')};
  border-color: rgba(0, 0, 0, 0.5);
`;
const EmotionText = styled.Text`
  font-size: 24px;
`;

const emotions = ['🤯', '🥲', '🤬', '🤗', '🥰', '😊', '🤩'];

export default function Write() {
  const realm = useRealm();
  const router = useRouter();

  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const [feelings, setFeelings] = useState('');
  const onChangeText = (text: string) => setFeelings(text);
  const onEmotionPress = (face: string) => setSelectedEmotion(face);
  const onSubmit = () => {
    if (feelings === '' || selectedEmotion === null) {
      return Alert.alert('Please complete form.');
    }

    realm.write(() => {
      realm.create(Feeling, {
        _id: new BSON.ObjectId(),
        emotion: selectedEmotion,
        message: feelings,
      });
    });

    router.back();
  };
  return (
    <View>
      <Title>How do you feel today?</Title>
      <Emotions>
        {emotions.map((emotion, index) => (
          <Emotion
            key={index}
            selected={emotion === selectedEmotion}
            onPress={() => onEmotionPress(emotion)}>
            <EmotionText>{emotion}</EmotionText>
          </Emotion>
        ))}
      </Emotions>
      <TextInput
        returnKeyType="done"
        onSubmitEditing={onSubmit}
        onChangeText={onChangeText}
        value={feelings}
        placeholder="Write your feelings..."
      />
      <Btn onPress={onSubmit}>
        <BtnText>Save</BtnText>
      </Btn>
    </View>
  );
}
