import { createContext, PropsWithChildren, useContext, useState } from 'react';

type TRoomContext = {
  currentRoomId?: string;
  updateCurrentRoomId: (roomId: string) => void;
};
const RoomContext = createContext<TRoomContext>({} as TRoomContext);

export const RoomProvider = ({ children }: PropsWithChildren) => {
  const [currentRoomId, setCurrentRoomId] = useState<string>();

  const updateCurrentRoomId = (roomId: string) => {
    setCurrentRoomId(roomId);
  };

  return (
    <RoomContext.Provider
      value={{
        currentRoomId,
        updateCurrentRoomId,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};

export const useRoomContext = () => {
  const context = useContext(RoomContext);
  if (!context) {
    throw new Error('useRoomContext must be used within a RoomProvider');
  }
  return context;
};
