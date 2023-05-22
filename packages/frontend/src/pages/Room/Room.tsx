import React, { useEffect, useRef, useState } from 'react';
import {
  useLoaderData,
  LoaderFunctionArgs,
  useNavigate,
} from 'react-router-dom';
import { io } from 'socket.io-client';
import Peer from 'peerjs';
import Video from './Video';
import Button, { Sizes } from '@/components/Button/Button';

type RoomLoaderData = {
  roomId: string;
};

interface User {
  userId?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  call?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  src?: MediaStream;
}

export const RoomLoader = ({ params }: LoaderFunctionArgs) => {
  return { roomId: params.roomId };
};

const Room: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User>({});
  const navigate = useNavigate();
  const { roomId } = useLoaderData() as RoomLoaderData;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const socket = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const myPeer = useRef<any>(null);

  const disconnect = () => {
    myPeer.current.disconnect();
    if (user.src) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      user.src.getTracks().forEach((track: MediaStreamTrack) => {
        track.stop();
        user?.src?.removeTrack(track);
      });
    }
    socket.current.disconnect();
    navigate('/');
  };

  useEffect(() => {
    socket.current = io(import.meta.env.VITE_API_URL);
    socket.current.on('connect', () => {
      console.log(socket.current.id);
    });
    myPeer.current = new Peer('', {
      host: import.meta.env.VITE_PEER_HOST,
      port: import.meta.env.VITE_PEER_PORT,
      path: import.meta.env.VITE_PEER_PATH,
    });

    return () => {
      socket.current.on('disconnect', () => {
        console.log('disconnect');
      });
    };
  }, []);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    myPeer.current.on('open', (id: any) => {
      socket.current.emit('join-room', roomId, id);
    });
    const setupVideo = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setUser({ src: stream });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      myPeer.current.on('call', (call: any) => {
        call.answer(stream);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        call.on('stream', (userVideoStream: any) => {
          setUsers([...users, { src: userVideoStream, call }]);
        });
      });
      socket.current.on('user-connected', (userId: string) => {
        const call = myPeer.current.call(userId, stream);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        call.on('stream', (userVideoStream: any) => {
          setUsers([...users, { src: userVideoStream, userId, call }]);
        });
        call.on('close', () => {
          setUsers(users.filter((data) => data.userId !== userId));
        });
      });

      socket.current.on('user-disconnected', (userId: string) => {
        const index = users.findLastIndex((n) => n.userId === userId);
        if (index > -1) {
          users[index].call.close();
          setUsers(users.filter((data) => data.userId !== userId));
        }
      });
    };
    setupVideo();
  }, [roomId, users]);
  return (
    <div className="h-screen">
      <div className="flex h-3/4 items-center justify-center">
        <div className="flex flex-row items-center justify-center">
          <Video src={user.src} />
          {users.map((streams) => (
            // eslint-disable-next-line react/jsx-key
            <Video src={streams.src} key={streams.userId} />
          ))}
        </div>
      </div>
      <div className="-mt-12 flex flex-row items-center justify-center text-center">
        <Button text="disconnect" size={Sizes.xl} onClick={disconnect} />
      </div>
    </div>
  );
};

export default Room;
