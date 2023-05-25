import React, {createRef, useEffect, useRef, useState} from 'react';
import {Platform, KeyboardAvoidingView} from 'react-native';
import {createNote, deleteNote, updateNote} from '../utils/storage';
import PushNotification from 'react-native-push-notification';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Button,
  CheckIcon,
  Checkbox,
  ChevronRightIcon,
  CircleIcon,
  DeleteIcon,
  HStack,
  IconButton,
  Input,
  Text,
  View,
} from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';

function NoteScreen({navigation, route}) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [reminder, setReminder] = useState(false);
  const [reminderDate, setReminderDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    if (route.params?.note) {
      setTitle(route.params.note.title);
      setContent(route.params.note.content);
      setReminder(route.params.note.reminder);
      setReminderDate(route.params.note.reminderDate);
    }
  }, [route.params?.note]);

  const handleSaveNote = () => {
    let id = route.params?.note?.id || null;
    let dateReminder = reminder ? reminderDate : new Date();
    if (id) {
      updateNote(id, title, content, reminder, dateReminder).then(() => {
        if (reminder) {
          // TODO: Handle reminder & set local notification
        } else {
          // TODO: Handle clear local notification
        }
        navigation.goBack();
      });
    } else {
      createNote(title, content, reminder, dateReminder).then(res => {
        if (reminder) {
          // TODO: Handle reminder & set local notification
        } else {
          // TODO: Handle clear local notification
        }
        navigation.goBack();
      });
    }
  };

  const handleDeleteNote = () => {
    deleteNote(route.params?.note?.id).then(() => {
      // TODO: Handle clear local notification
      navigation.goBack();
    });
  };

  const setLocalNotification = time => {
    const notificationId = new Date().getTime().toString();
    PushNotification.localNotificationSchedule({
      id: notificationId,
      title: title || 'Note App', // (required)
      message: content || 'Reminder for your note', // (required)
      date: reminderDate || new Date(Date.now() + 60 * 1000), // in 60 secs
      allowWhileIdle: true, // (optional) set notification to work while on doze, default: false
    });
  };

  const clearLocalNotification = () => {
    PushNotification.cancelAllLocalNotifications();
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HStack space={2}>
          <IconButton
            icon={<CircleIcon />}
            onPress={() => setReminder(!reminder)}
            colorScheme="blue"
          />
          <IconButton
            icon={<DeleteIcon />}
            onPress={handleDeleteNote}
            colorScheme="red"
          />
          <IconButton
            icon={<CheckIcon />}
            onPress={handleSaveNote}
            colorScheme="green"
          />
        </HStack>
      ),
    });
  }, [
    navigation,
    reminder,
    reminderDate,
    title,
    content,
    handleDeleteNote,
    handleSaveNote,
  ]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={{flex: 1, padding: 16}}>
          <View>
            <Input
              label="Title"
              backgroundColor="inherit"
              value={title}
              onChangeText={setTitle}
              placeholder="Enter title..."
              borderWidth={0}
            />
            <Input
              multiline
              backgroundColor="inherit"
              borderWidth={0}
              label="Content"
              value={content}
              onChangeText={setContent}
              placeholder="Enter content..."
            />
            <View style={{marginTop: 16}}>
              <Checkbox
                isChecked={reminder}
                onChange={isChecked => setReminder(isChecked)}>
                Remind Me
              </Checkbox>
            </View>
            {reminder && (
              <HStack
                style={{
                  marginTop: 6,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Button
                  onPress={() => setShowPicker(!showPicker)}
                  leftIcon={<ChevronRightIcon />}
                  variant="subtle">
                  <Text>
                    {reminderDate
                      ? reminderDate.toLocaleString()
                      : 'Select date and time'}
                  </Text>
                </Button>
                {showPicker && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={new Date(reminderDate)}
                    mode="datetime"
                    is24Hour={true}
                    onChange={(e, selectedDateTime) => {
                      setShowPicker(false);
                      if (e.type === 'set') {
                        const currentDateTime = selectedDateTime;
                        setReminderDate(new Date(currentDateTime));
                      }
                    }}
                  />
                )}
              </HStack>
            )}
          </View>
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Button onPress={handleSaveNote}>Save</Button>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default NoteScreen;
