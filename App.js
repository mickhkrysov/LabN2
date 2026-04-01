import React, { useMemo, useState } from 'react';
import {Alert, SafeAreaView, SectionList, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View,} from 'react-native';

const CONTACTS = [
  { id: '1',  name: 'Alice Martin',     phone: '(416) 555-0101', city: 'Toronto'     },
  { id: '2',  name: 'Aisha Mohammed',   phone: '(905) 555-0167', city: 'Oakville'    },
  { id: '3',  name: 'Bob Chen',         phone: '(647) 555-0134', city: 'Markham'     },
  { id: '4',  name: 'Carlos Rivera',    phone: '(905) 555-0312', city: 'Burlington'  },
  { id: '5',  name: 'Clara Kim',        phone: '(416) 555-0198', city: 'Toronto'     },
  { id: '6',  name: 'David Patel',      phone: '(289) 555-0245', city: 'Hamilton'    },
  { id: '7',  name: 'Emma Thompson',    phone: '(416) 555-0276', city: 'Toronto'     },
  { id: '8',  name: 'Frank Wilson',     phone: '(905) 555-0189', city: 'Mississauga' },
  { id: '9',  name: 'Grace Lee',        phone: '(647) 555-0321', city: 'Scarborough' },
  { id: '10', name: 'James O\'Brien',   phone: '(416) 555-0234', city: 'Toronto'     },
  { id: '11', name: 'Julia Santos',     phone: '(905) 555-0142', city: 'Brampton'    },
  { id: '12', name: 'Marcus Williams',  phone: '(647) 555-0398', city: 'Etobicoke'   },
];

function groupByLetter(contacts) {
  const grouped = {};

  contacts.forEach((contact) => {
    const letter = contact.name[0].toUpperCase();

    if (!grouped[letter]) {
      grouped[letter] = [];
    }

    grouped[letter].push(contact);
  });

  return Object.keys(grouped)
    .sort()
    .map((letter) => ({
      title: letter,
      data: grouped[letter],
    }));
}

export default function App() {
  const [searchText, setSearchText] = useState('');

  const filteredContacts = useMemo(() => {
    return CONTACTS.filter((contact) =>
      contact.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText]);

  const sections = useMemo(() => groupByLetter(filteredContacts), [filteredContacts]);

  const showPhoneNumber = (contact) => {
    Alert.alert(contact.name, `Phone: ${contact.phone}`);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.contactRow}
      onPress={() => showPhoneNumber(item)}
      activeOpacity={0.7}
    >
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{item.name[0]}</Text>
      </View>

      <View style={styles.contactInfo}>
        <Text style={styles.contactName}>{item.name}</Text>
        <Text style={styles.contactCity}>{item.city}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderSectionHeader = ({ section:{title}}) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{title}</Text>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  topArea: {
    backgroundColor: '#0f172a',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 14,
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 12,
  },
  searchInput: {
    backgroundColor: '#1e293b',
    color: 'white',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
  },
  listContent: {
    paddingBottom: 20,
  },
  sectionHeader: {
    backgroundColor: '#dbe4f0',
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  sectionHeaderText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#475569',
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  avatar: { //profile picture
    width: 42,
    height: 42,
    borderRadius: 42/2,
    backgroundColor: '#8b5cf6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  avatarText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
  },
  contactCity: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 2,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 16,
    color: '#64748b',
  },
});