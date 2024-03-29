import React, {useCallback, useState} from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getNotes} from '../utils/storage';
import {
  AddIcon,
  Box,
  Fab,
  FlatList,
  Pressable,
  Text,
  VStack,
  View,
} from 'native-base';
import {useFocusEffect} from '@react-navigation/core';
import {AppBar} from '../components';
import {DateChanger} from '../utils';

const MainScreen = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState([]);

  useFocusEffect(
    useCallback(() => {
      setTimeout(() => {
        getNotes().then(setNotes);
        setLoading(false);
      }, 500);
    }, []),
  );

  const handleAddOrEditNote = (note = null) => {
    navigation.navigate('Note', {note: note});
  };

  return (
    <SafeAreaView style={styles.flex}>
      <AppBar title={'Halo, ' + DateChanger.Greetings()} />
      <View flex={1} px={3}>
        {notes?.length > 0 ? (
          <FlatList
            data={notes}
            renderItem={({item, index}) => (
              <Pressable
                onPress={() => handleAddOrEditNote(item)}
                mb={index === notes.length - 1 ? 16 : 0}>
                {({isHovered, isFocused, isPressed}) => (
                  <Box
                    bg={
                      isPressed
                        ? 'coolGray.200'
                        : isHovered
                        ? 'coolGray.200'
                        : 'coolGray.100'
                    }
                    style={{
                      transform: [
                        {
                          scale: isPressed ? 0.96 : 1,
                        },
                      ],
                    }}
                    px={4}
                    py={2}
                    rounded={12}
                    shadow={3}
                    my={2}
                    mx={1}>
                    <VStack space={1}>
                      {item.title && (
                        <Text bold isTruncated>
                          {item.title}
                        </Text>
                      )}
                      {item.content && <Text isTruncated>{item.content}</Text>}
                      <Text italic fontSize="xs" color="coolGray.400">
                        {new Date(item.updatedAt).toLocaleString()}
                      </Text>
                    </VStack>
                  </Box>
                )}
              </Pressable>
            )}
            keyExtractor={item => item.id}
          />
        ) : (
          <View style={styles.emptyState}>
            {!loading && <Text>You have not created any not yet</Text>}
          </View>
        )}
      </View>
      <Fab
        renderInPortal={false}
        shadow={2}
        size="sm"
        icon={<AddIcon />}
        onPress={() => handleAddOrEditNote()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  emptyState: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default MainScreen;
