import styled from 'styled-components/native';
import { router } from 'expo-router';
import colors from '@/colors';
import { Ionicons } from '@expo/vector-icons';
import { useQuery, useRealm } from '@realm/react';
import Feeling from '@/schema/feeling';
import { FlatList, TouchableOpacity } from 'react-native';
import { ObjectID } from 'bson';
import { useEffect } from 'react';

const View = styled.View`
  flex: 1;
  padding: 100px 30px 0 30px;
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
const Record = styled.View`
  background-color: ${colors.cardColor};
  flex-direction: row;
  align-items: center;
  padding: 10px 20px;
  border-radius: 10px;
`;
const Emotion = styled.Text`
  font-size: 24px;
  margin-right: 10px;
`;
const Message = styled.Text`
  font-size: 18px;
`;
const Separator = styled.View`
  height: 10px;
`;

export default function Home() {
  const realm = useRealm();
  const feelings = useQuery(Feeling, collection => collection.sorted('_id', true));
  const onPress = (id: ObjectID) => {
    const toDelete = realm.objects(Feeling).filtered('_id == $0', id);

    realm.write(() => {
      realm.delete(toDelete);
    });
  };

  useEffect(() => {
    // layout animation 후 앱 비정상 종료되서 주석 처리함.
    //   LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  }, []);

  return (
    <View>
      <Title>My journal</Title>
      <FlatList
        data={feelings}
        contentContainerStyle={{ paddingVertical: 10 }}
        ItemSeparatorComponent={Separator}
        keyExtractor={feeling => feeling._id + ''}
        renderItem={({ item }: { item: Feeling }) => (
          <TouchableOpacity onPress={() => onPress(item._id)}>
            <Record>
              <Emotion>{item.emotion}</Emotion>
              <Message>{item.message}</Message>
            </Record>
          </TouchableOpacity>
        )}
      />
      <Btn onPress={() => router.navigate('/write')}>
        <Ionicons name={'add'} color="white" size={40} />
      </Btn>
    </View>
  );
}
