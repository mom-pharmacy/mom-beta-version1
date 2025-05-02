// app/profile/ProfileItem.jsx
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

function ProfileItem({ title, icon, mainIcon, link }) {
  return (
    <Link href={link} asChild>
      <Pressable
        style={({ pressed }) => [
          styles.itemContainer,
          pressed && styles.pressed,
        ]}
        android_ripple={{ color: '#eee' }}
      >
        <View style={styles.row}>
          <View style={styles.left}>
            {mainIcon}
            <Text style={styles.title}>{title}</Text>
          </View>
          <View style={styles.right}>
            {icon}
          </View>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  pressed: {
    backgroundColor: '#f2f2f2',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    alignItems: 'center',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  right: {
    paddingRight: 4,
  },
  title: {
    fontWeight: '600',
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
  },
});

export default ProfileItem;
