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
  ToastAndroid,
  View,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {launchImageLibrary} from 'react-native-image-picker';
import uuid from 'react-native-uuid';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import VideoPlayer from 'react-native-video-player';
import {AGENTS} from '../../../constants/agents';
import {MAPS} from '../../../constants/maps';
import {RANKS} from '../../../constants/ranks';
import {SERVERS} from '../../../constants/servers';
import {EDIT_PROFILE_MUTATION} from '../../../graphql/mutations';
import theme from '../../../theme';
import {ProfileStackParamList} from '../../../types';
import Profile from '../../../types/Profile';
import styles from './EditProfile.style';

const EditProfile = ({navigation, data}: IEditProfileProps) => {
  let {
    riotID: riotIDInitial,
    tagline: taglineInitial,
    clip: clipInitial,
    agents: agentsInitial,
    favoriteMap: favoriteMapInitial,
    lookingToPlay: lookingToPlayInitial,
    rank: rankInitial,
    server: serverInitial,
  } = data;

  DropDownPicker.setListMode('MODAL');

  const [riotID, setRiotID] = useState(riotIDInitial ? riotIDInitial : '');
  const [tagline, setTagline] = useState(taglineInitial ? taglineInitial : '');
  const [clip, setClip] = useState(clipInitial ? clipInitial : '');

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

  function deleteClip() {
    setClip('');
  }

  function addClip(clipUrl: string) {
    setClip(clipUrl);
  }

  const showUploadingToast = () => {
    ToastAndroid.show(
      'Please wait for the upload to finish!',
      ToastAndroid.SHORT,
    );
  };

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
      clip,
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
          showUploadingToast();
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
      <View style={styles.container}>
        <Text style={styles.title}>Edit Profile</Text>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Riot ID</Text>
          <TextInput
            value={riotID}
            autoCapitalize="none"
            onChangeText={text => setRiotID(text)}
            style={styles.input}
            placeholder="SEN Tenz"
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Tagline #</Text>
          <TextInput
            value={tagline}
            autoCapitalize="none"
            onChangeText={text => setTagline(text)}
            style={styles.input}
            placeholder="TENZ"
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Rank</Text>
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
          <Text style={styles.inputLabel}>Favorite Map</Text>
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
          <Text style={styles.inputLabel}>Looking to play</Text>
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
          <Text style={styles.inputLabel}>Server</Text>
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
          <Text style={styles.inputLabel}>Agents</Text>
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
        <View style={styles.clipsContainer}>
          <Text style={styles.inputLabel}>Your clips</Text>
          {clip ? (
            <View style={styles.videoRow}>
              <View style={styles.videoWrapper}>
                <VideoPlayer
                  autoplay
                  video={{
                    uri: clip,
                  }}
                  videoWidth={1600}
                  videoHeight={900}
                  thumbnail={require('../../../assets/img/valcon-thumbnail.png')}
                  endThumbnail={require('../../../assets/img/valcon-thumbnail.png')}
                />
              </View>
              <Pressable onPress={deleteClip}>
                <MaterialIcons
                  name="delete"
                  size={28}
                  color={theme.colors.white}
                />
              </Pressable>
            </View>
          ) : (
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
        </View>
      </View>
    </ScrollView>
  );
};

interface IEditProfileProps
  extends NativeStackScreenProps<ProfileStackParamList, 'EditProfile'> {
  data: Profile;
}

export default EditProfile;
