import {useMutation} from '@apollo/client';
import {useFocusEffect} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useState} from 'react';
import {
  ActivityIndicator,
  BackHandler,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {launchImageLibrary} from 'react-native-image-picker';
import uuid from 'react-native-uuid';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import VideoPlayer from 'react-native-video-player';
import {AGENTS} from '../../constants/agents';
import {MAPS} from '../../constants/maps';
import {RANKS} from '../../constants/ranks';
import {SERVERS} from '../../constants/servers';
import {EDIT_PROFILE_MUTATION} from '../../graphql/mutations';
import theme from '../../theme';
import {ProfileStackParamList} from '../../types';
import Profile from '../../types/Profile';
import styles from './EditProfile.style';

const EditProfile = ({navigation, data}: IEditProfileProps) => {
  let {
    riotID: riotIDInitial,
    tagline: taglineInitial,
    clips: clipsInitial,
    agents: agentsInitial,
    favoriteMap: favoriteMapInitial,
    lookingToPlay: lookingToPlayInitial,
    rank: rankInitial,
    server: serverInitial,
  } = data;

  DropDownPicker.setListMode('MODAL');

  const [riotID, setRiotID] = useState(riotIDInitial ? riotIDInitial : '');
  const [tagline, setTagline] = useState(taglineInitial ? taglineInitial : '');
  const [clips, setClips] = useState(clipsInitial ? clipsInitial : []);

  const [agents, setAgents] = useState(agentsInitial ? agentsInitial : []);
  const [favoriteMap, setFavoriteMap] = useState(
    favoriteMapInitial ? favoriteMapInitial : '',
  );
  const [lookingToPlay, setLookingToPlay] = useState(
    lookingToPlayInitial ? lookingToPlayInitial : '',
  );
  const [rank, setRank] = useState(rankInitial ? rankInitial : 0);
  const [server, setServer] = useState(serverInitial ? serverInitial : '');

  const [rankOpen, setRankOpen] = useState(false);
  const [ranks, setRanks] = useState(
    RANKS.map((rank, i) => ({
      label: rank,
      value: i,
    })),
  );

  const [favoriteMapOpen, setFavoriteMapOpen] = useState(false);
  const [maps, setMaps] = useState(
    MAPS.map(map => ({
      label: map,
      value: map,
    })),
  );

  const [lookingToPlayOpen, setLookingToPlayOpen] = useState(false);
  const [gameModes, setGameModes] = useState([
    {label: 'Casual', value: 'Casual'},
    {label: 'Competitive', value: 'Competitive'},
  ]);

  const [serverOpen, setServerOpen] = useState(false);
  const [servers, setServers] = useState(
    SERVERS.map(server => ({
      label: server,
      value: server,
    })),
  );

  const [agentsOpen, setAgentsOpen] = useState(false);
  const [gameAgents, setGameAgents] = useState(
    AGENTS.map(agent => ({
      label: agent,
      value: agent,
    })),
  );

  const onRankOpen = useCallback(() => {
    setFavoriteMapOpen(false);
    setLookingToPlayOpen(false);
    setServerOpen(false);
    setAgentsOpen(false);
  }, []);

  const onFavoriteMapOpen = useCallback(() => {
    setRankOpen(false);
    setLookingToPlayOpen(false);
    setServerOpen(false);
    setAgentsOpen(false);
  }, []);

  const onLookingToPlayOpen = useCallback(() => {
    setRankOpen(false);
    setFavoriteMapOpen(false);
    setServerOpen(false);
    setAgentsOpen(false);
  }, []);

  const onServerOpen = useCallback(() => {
    setRankOpen(false);
    setFavoriteMapOpen(false);
    setLookingToPlayOpen(false);
    setAgentsOpen(false);
  }, []);

  const onAgentsOpen = useCallback(() => {
    setRankOpen(false);
    setFavoriteMapOpen(false);
    setLookingToPlayOpen(false);
    setServerOpen(false);
  }, []);

  function deleteClip(removeIndex: number) {
    const newClips = clips.filter((clip, i) => i != removeIndex);
    setClips(newClips);
  }

  function addClip(clipUrl: string) {
    setClips([...clips, clipUrl]);
  }

  const [uploadingVideo, setUploadingVideo] = useState(false);

  const selectVideo = async () => {
    launchImageLibrary(
      {mediaType: 'video', includeBase64: true},
      async response => {
        if (response.uri) {
          setUploadingVideo(true);

          let formData = new FormData();
          formData.append('file', {
            name: uuid.v4(),
            uri: response.uri,
            type: 'video/mp4',
          });
          formData.append('upload_preset', 'mzg2twvm');

          const res = await fetch(
            `https://api.cloudinary.com/v1_1/mizanxali/video/upload`,
            {
              method: 'POST',
              body: formData,
            },
          );

          const text = await res.text();

          const data = JSON.parse(text);
          addClip(data.secure_url);
          setUploadingVideo(false);
        }
      },
    );
  };

  const [editProfile] = useMutation(EDIT_PROFILE_MUTATION, {
    onError(err) {
      console.log(err.graphQLErrors[0]);
    },
    variables: {
      riotID,
      tagline,
      clips,
      agents,
      favoriteMap,
      lookingToPlay,
      rank,
      server,
    },
  });

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (uploadingVideo) {
          return true;
        } else {
          editProfile();
          return false;
        }
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [uploadingVideo]),
  );

  return (
    <ScrollView style={styles.screen}>
      <Text>Edit Profile</Text>
      <View style={styles.inputGroup}>
        <Text>Riot ID</Text>
        <TextInput
          value={riotID}
          autoCapitalize="none"
          onChangeText={text => setRiotID(text)}
          style={styles.input}
          placeholder="SEN Tenz"
        />
      </View>
      <View style={styles.inputGroup}>
        <Text>Tagline #</Text>
        <TextInput
          value={tagline}
          autoCapitalize="none"
          onChangeText={text => setTagline(text)}
          style={styles.input}
          placeholder="TENZ"
        />
      </View>
      <View style={styles.inputGroup}>
        <Text>Rank</Text>
        <DropDownPicker
          theme="DARK"
          open={rankOpen}
          value={rank}
          items={ranks}
          setOpen={setRankOpen}
          // @ts-ignore
          setValue={setRank}
          setItems={setRanks}
          onOpen={onRankOpen}
          zIndex={5000}
          zIndexInverse={1000}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text>Favorite Map</Text>
        <DropDownPicker
          theme="DARK"
          open={favoriteMapOpen}
          value={favoriteMap}
          items={maps}
          setOpen={setFavoriteMapOpen}
          // @ts-ignore
          setValue={setFavoriteMap}
          setItems={setMaps}
          onOpen={onFavoriteMapOpen}
          zIndex={4000}
          zIndexInverse={2000}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text>Looking to play</Text>
        <DropDownPicker
          theme="DARK"
          open={lookingToPlayOpen}
          value={lookingToPlay}
          items={gameModes}
          setOpen={setLookingToPlayOpen}
          // @ts-ignore
          setValue={setLookingToPlay}
          setItems={setGameModes}
          onOpen={onLookingToPlayOpen}
          zIndex={3000}
          zIndexInverse={3000}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text>Server</Text>
        <DropDownPicker
          theme="DARK"
          open={serverOpen}
          value={server}
          items={servers}
          setOpen={setServerOpen}
          // @ts-ignore
          setValue={setServer}
          setItems={setServers}
          onOpen={onServerOpen}
          zIndex={2000}
          zIndexInverse={4000}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text>Agents</Text>
        <DropDownPicker
          multiple={true}
          theme="DARK"
          open={agentsOpen}
          value={agents}
          items={gameAgents}
          setOpen={setAgentsOpen}
          // @ts-ignore
          setValue={setAgents}
          setItems={setGameAgents}
          onOpen={onAgentsOpen}
          zIndex={1000}
          zIndexInverse={5000}
        />
      </View>
      <Text>Your clips</Text>
      {clips.map((clip, i) => (
        <View key={i} style={styles.videoRow}>
          <View style={styles.videoWrapper}>
            <VideoPlayer
              video={{
                uri: clip,
              }}
              videoWidth={1600}
              videoHeight={900}
              thumbnail={{uri: 'https://i.picsum.photos/id/866/1600/900.jpg'}}
            />
          </View>
          <Pressable onPress={() => deleteClip(0)}>
            <MaterialIcons name="delete" size={28} color={theme.colors.white} />
          </Pressable>
        </View>
      ))}
      {clips.length < 3 && (
        <Pressable onPress={selectVideo}>
          <View style={styles.addVideoCard}>
            {uploadingVideo ? (
              <ActivityIndicator />
            ) : (
              <Text style={styles.addVideoText}>Add Clip</Text>
            )}
          </View>
        </Pressable>
      )}
    </ScrollView>
  );
};

interface IEditProfileProps
  extends NativeStackScreenProps<ProfileStackParamList, 'EditProfile'> {
  data: Profile;
}

export default EditProfile;
