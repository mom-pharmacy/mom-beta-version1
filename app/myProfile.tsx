// app/profile/index.jsx
import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import MangeProfiles from './Profile/ManageProfiles';
import ProfileItem from './Profile/ProfileItems';

const profileItems = [
    {
        name: 'Edit Profile',
        mainIcon: <Ionicons name="person-outline" size={24} color="#00a99d" />,
        icon: <Ionicons name="arrow-forward" size={20} color="#ccc" />,
        link: '/Profile/edit',
      },
  {
    name: 'My Orders',
    mainIcon: <Ionicons name="cart-outline" size={24} color="#00a99d" />,
    icon: <Ionicons name="arrow-forward" size={20} color="#ccc" />,
    link: '/Profile/_orders',
  },
  {
    name: 'My Addresses',
    mainIcon: <Ionicons name="location-outline" size={24} color="#00a99d" />,
    icon: <Ionicons name="arrow-forward" size={20} color="#ccc" />,
    link: '/Profile/myaddress',
  },
  {
    name: 'About Us',
    mainIcon: <Ionicons name="information-circle-outline" size={24} color="#00a99d" />,
    icon: <Ionicons name="arrow-forward" size={20} color="#ccc" />,
    link: '/Profile/_about',
  },
  {
    name: 'My Prescriptions',
    mainIcon: <Ionicons name="document-text-outline" size={24} color="#00a99d" />,
    icon: <Ionicons name="arrow-forward" size={20} color="#ccc" />,
    link: '/Profile/prescription',
  },
  {
    name: 'My Previous Records',
    mainIcon: <Ionicons name="folder" size={24} color="#00a99d" />,
    icon: <Ionicons name="arrow-forward" size={20} color="#ccc" />,
    link: '/Profile/healthrecords',
  },
  {
    name: 'My Subscriptions',
    mainIcon: <Ionicons name="newspaper" size={24} color="#00a99d" />,
    icon: <Ionicons name="arrow-forward" size={20} color="#ccc" />,
    link: '/Profile/subscription',
  },
  {
    name: 'Suggestions',
    mainIcon: <Ionicons name="star-outline" size={24} color="#00a99d" />,
    icon: <Ionicons name="arrow-forward" size={20} color="#ccc" />,
    link: '/Profile/suggestion',
  },
  {
    name: 'Referral and Earn',
    mainIcon: <Ionicons name="gift-outline" size={24} color="#00a99d" />,
    icon: <Ionicons name="arrow-forward" size={20} color="#ccc" />,
    link: '/Profile/referal',
  },
  {
    name: 'Terms And Conditions',
    mainIcon: <Ionicons name="lock-closed" size={24} color="#00a99d" />,
    icon: <Ionicons name="arrow-forward" size={20} color="#ccc" />,
    link: '/Profile/_terms',
  },
  {
    name: 'Settings',
    mainIcon: <Ionicons name="settings-outline" size={24} color="#00a99d" />,
    icon: <Ionicons name="arrow-forward" size={20} color="#ccc" />,
    link: '/Profile/settings',
  },
  {
    name: 'Help And Support',
    mainIcon: <Ionicons name="help-circle" size={24} color="#00a99d" />,
    icon: <Ionicons name="arrow-forward" size={20} color="#ccc" />,
    link: '/Profile/hs',
  },
  {
    name: 'Logout',
    mainIcon: <Ionicons name="log-out-outline" size={24} color="#00a99d" />,
    icon: <Ionicons name="arrow-forward" size={20} color="#ccc" />,
    link: '/Profile/Login',
  },
];

const myProfile = () => {
  return (
    <ScrollView>
      <View>
        <View style={styles.header}>
          <Image source={require('./../assets/images/momlogo.jpeg')} style={styles.profileImage} />
          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.phone}>88976342121</Text>
        </View>

        {/* <MangeProfiles /> */}

        <FlatList
          data={profileItems}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <ProfileItem
              title={item.name}
              mainIcon={item.mainIcon}
              icon={item.icon}
              link={item.link}
            />
          )}
          scrollEnabled={false}
        />
      </View>
    </ScrollView>
  );
};

export default myProfile;

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#00a99d',
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'black',
    marginTop: 10,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  phone: {
    fontSize: 15,
    color: 'white',
  },
});