import React, {useState} from 'react';
import {Platform} from 'react-native';
import {createNote, deleteNote, updateNote} from '../utils/storage';
import PushNotification from 'react-native-push-notification';
import {
  Button,
  CheckIcon,
  ChevronRightIcon,
  DeleteIcon,
  HStack,
  Input,
  Text,
  View,
  KeyboardAvoidingView,
} from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import AppBar from '../components/AppBar';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../styles/theme';
import {SafeAreaView} from 'react-native-safe-area-context';

function NoteScreen({navigation, route}) {
  let hasUnsavedChanges = false;
  const [state, setState] = useState({
    title: route.params.note.title || '',
    content: route.params.note.content || '',
    reminder: route.params.note.reminder || false,
    reminderDate: route.params.note.reminderDate || new Date(),
  });
  const [showPicker, setShowPicker] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleStateChange = (key, value) => {
    setState({...state, [key]: value});
    hasUnsavedChanges = true;
  };

  const handleSaveNote = () => {
    let id = route.params?.note?.id || null;
    let dateReminder = state.reminder ? state.reminderDate : new Date();
    if (id) {
      updateNote(
        id,
        state.title,
        state.content,
        state.reminder,
        dateReminder,
      ).then(() => {
        if (state.reminder) {
          // TODO: Handle reminder & set local notification
        } else {
          // TODO: Handle clear local notification
        }
        hasUnsavedChanges = false;
        navigation.goBack();
      });
    } else {
      createNote(state.title, state.content, state.reminder, dateReminder).then(
        res => {
          if (state.reminder) {
            // TODO: Handle reminder & set local notification
          } else {
            // TODO: Handle clear local notification
          }
          hasUnsavedChanges = false;
          navigation.goBack();
        },
      );
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
      title: state.title || 'Note App', // (required)
      message: state.content || 'Reminder for your note', // (required)
      date: state.reminderDate || new Date(Date.now() + 60 * 1000), // in 60 secs
      allowWhileIdle: true, // (optional) set notification to work while on doze, default: false
    });
  };

  const clearLocalNotification = () => {
    PushNotification.cancelAllLocalNotifications();
  };

  return (
    <SafeAreaView style={{flex: 1}} backgroundColor="#fff">
      <AppBar
        title="Notes"
        backButton
        rightItems={[
          // {
          //   name: 'Reminder Me',
          //   icon: (
          //     <MaterialCommunityIcons
          //       name="timer-cog"
          //       color={theme.colors.info[500]}
          //       size={20}
          //     />
          //   ),
          //   onPress: () => setShowPicker(true),
          //   color: theme.colors.info[500],
          // },
          {
            name: 'Delete',
            icon: <DeleteIcon size={4} color={theme.colors.danger[500]} />,
            onPress: handleDeleteNote,
            color: theme.colors.danger[500],
          },
          {
            name: 'Save',
            icon: <CheckIcon size={4} color={theme.colors.info[500]} />,
            onPress: handleSaveNote,
            color: theme.colors.info[500],
          },
        ]}
      />

      <KeyboardAvoidingView
        flex={1}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View flex={1} py={2} px={4}>
          <View>
            <Input
              fontWeight="bold"
              label="Title"
              backgroundColor="inherit"
              value={state.title}
              onChangeText={text => handleStateChange('title', text)}
              placeholder="Enter title..."
              borderWidth={0}
              p={0}
            />
            <Input
              multiline
              p={0}
              borderWidth={0}
              backgroundColor="inherit"
              label="Content"
              value={state.content}
              onChangeText={text => handleStateChange('content', text)}
              placeholder="Enter content..."
            />

            {/* <HStack
              mt={6}
              alignItems={'center'}
              justifyContent={'space-between'}>
              <Button
                onPress={() => setShowPicker(!showPicker)}
                leftIcon={<ChevronRightIcon />}
                variant="subtle">
                <Text>
                  {state.reminderDate
                    ? state.reminderDate.toLocaleString()
                    : 'Select date and time'}
                </Text>
              </Button> */}
            {showPicker && (
              <DateTimePicker
                value={new Date(state.reminderDate)}
                mode="datetime"
                display="default"
                timeZoneOffsetInMinutes={420}
                onChange={(e, selectedDateTime) => {
                  setShowPicker(false);
                  if (e.type === 'set') {
                    const currentDateTime = selectedDateTime;
                    handleStateChange('reminderDate', currentDateTime);
                  }
                }}
              />
            )}
            {/* </HStack> */}
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default NoteScreen;
