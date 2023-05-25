import React, {useCallback} from 'react';
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

const MainScreen = ({navigation}) => {
  const [notes, setNotes] = React.useState([]);

  useFocusEffect(
    useCallback(() => {
      getNotes().then(setNotes);
    }, []),
  );

  const handleAddOrEditNote = (note = null) => {
    navigation.navigate('Note', {note: note});
  };

  return (
    <SafeAreaView style={styles.flex}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text>NoteApp</Text>
        </View>
        {notes?.length > 0 ? (
          <FlatList
            data={notes}
            renderItem={({item}) => (
              <Pressable onPress={() => handleAddOrEditNote(item)}>
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
                      <Text bold isTruncated>
                        {item.title}
                      </Text>
                      <Text isTruncated>{item.content}</Text>
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
            <Text>You have not created any not yet</Text>
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
