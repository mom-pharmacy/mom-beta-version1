// app/profile/manageProfiles.jsx
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

const profiles = [
  {
    profileName: 'John Doe',
    profileImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS-rzZuhiLEqr-GF6WnZGpUkS2zSErzEUYlg&s',
    isActive: true,
  },
  {
    profileName: 'Jane Doe',
    profileImage: 'https://images.unsplash.com/photo-1609863554781-35c7867dedb7?q=80',
    isActive: false,
  },
  {
    profileName: 'John Smith',
    profileImage: 'https://plus.unsplash.com/premium_photo-1689977871600-e755257fb5f8?q=80',
    isActive: false,
  },
  {
    profileName: 'Add Profile',
    profileImage: 'https://cdn-icons-png.flaticon.com/512/992/992651.png',
    isActive: false,
  },
];

function MangeProfiles() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Manage Profiles</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {profiles.map((profile, index) => (
          <View key={index} style={styles.profileItem}>
            <Image
              source={{ uri: profile.profileImage }}
              style={[
                styles.profileImage,
                profile.isActive && styles.activeBorder,
              ]}
            />
            <Text style={styles.profileName}>{profile.profileName}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

export default MangeProfiles;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  profileItem: {
    alignItems: 'center',
    marginRight: 15,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 5,
    borderColor: '#fff',
    borderWidth: 2,
  },
  activeBorder: {
    borderColor: '#00a99d',
    borderWidth: 3,
  },
  profileName: {
    fontSize: 13,
    fontWeight: '500',
  },
});
