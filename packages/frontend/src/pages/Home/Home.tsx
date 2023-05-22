import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import Header from '@/components/Header/Header';
import Input from '@/components/Input/Input';
import Button, { Sizes } from '@/components/Button/Button';
import Link from '@/components/SimpleLink/SimpleLink';
import apiService from '@/utils/apiService';
import { isValidUrl } from '@/utils/utils';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState<string>('');

  const createRoom = async () => {
    const response = await apiService.get('/');
    if (response.data.roomId) {
      navigate(`/room/${response.data.roomId}`);
    }
  };

  const joinRoom = async () => {
    if (!roomId) {
      return alert('you need to enter a roomId');
    }
    const isUrl = isValidUrl(roomId);
    let localId = roomId;
    if (isUrl) {
      const url = new URL(roomId);
      const id = url.pathname.replace('/room/', '');
      if (!id) {
        return alert('You need to insert a valid url');
      }
      localId = id;
    }
    navigate(`/room/${localId}`);
  };
  return (
    <div className="h-screen">
      <Header />
      <div className="flex h-3/4 items-center justify-center">
        <div className="mt-12 flex flex-col items-center justify-center text-white">
          <p className="mt-3">
            <Button
              text="Create a Room"
              size={Sizes.xl2}
              onClick={createRoom}
            />
          </p>
          <p className="mt-3 text-center text-3xl text-white">Or Join One</p>
          <p className="mt-3 flex flex-row items-center justify-center gap-3 text-center">
            <Input
              name="room-id"
              id="room-id"
              placeholder="room id or room url"
              value={roomId}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onChange={(e: any) => {
                setRoomId(e.target.value);
                return e.target.value;
              }}
            />
            <Button text="Join Room" size={Sizes.xl} onClick={joinRoom} />
          </p>
          <p className="mt-3 flex gap-3 text-center text-[#8d96a7]">
            <Link url="https://reactjs.org" text="github" />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
