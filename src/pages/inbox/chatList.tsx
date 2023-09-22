import LazyImage from "@src/shared/lazyImage";
import { backendCall } from "@src/shared/utils/backendService/backendCall";
import CircleCross from "@assets/icons/circle-delete.png";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FiSearch } from "react-icons/fi";
import TestImg from "@assets/images/Food.png";
import MoreIcon from "@assets/vendor/icons/more.png";
import { ReactComponent as SearchIcon } from "@assets/icons/search-icon.svg";
import { ReactComponent as PencilIcon } from "@assets/icons/red-pencil.svg";
import { ReactComponent as ViewIcon } from "@assets/icons/witness.svg";
import Input from "@src/shared/input";
import { Spinner } from "@src/shared/spinner/spinner";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import noImage from "@assets/images/NoImage.png";
import { handleToastMessage } from "@src/shared/toastify";
import Popup from "@src/shared/popup/popup";
import CustomButton from "@src/shared/customButton";
import CustomCard from "@src/shared/cards/customCard";
import { Breadcrumbs } from "@material-tailwind/react";
import ChatWithCustomer from "./chat";
import { db } from "@src/firebaseConfig";
import { child, get, onValue, ref } from "firebase/database";
import { GetStorage } from "@src/shared/utils/authService";
let _MyUsers: any = [];
const ChatList = () => {
  const [userId, setUserId] = useState<any>("");
  const [vendorChats, setVendorChats] = useState([]);
  const [vendorUsers, setVendorUsers] = useState([]);
  const [usersList, setUsersLists] = useState([]);
  const [selectedUser, setSelectedUser] = useState<any>({});
  const [sortedUserList, setSortedUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const _getStorage = async () => {
      let _userData: any = await GetStorage();
      setUserId(_userData.id + "_customer");
    };
    _getStorage();
  }, []);
  useEffect(() => {
    const chatsRef: any = ref(db, "Chats");
    const getVendorChats = () => {
      return onValue(
        chatsRef,
        (snapshot) => {
          const chats: any = [];
          if (snapshot.val()) {
            Object.entries(snapshot.val()).map((member: any) => {
              if (member[1].members && member[1].members.includes(userId)) {
                chats.push(member);
              }
            });
            setVendorChats(chats);
            getUsers();
            setIsLoading(false);
          } else {
            console.log("No data available");
            setIsLoading(false);
          }
        },
        {
          onlyOnce: false,
        }
      );
    };
    if (userId) {
      getVendorChats();
    }
  }, [userId]);

  useEffect(() => {
    let _myUsers: any = [];
    vendorChats.forEach((chat: any) => {
      vendorUsers.find((user: any) => {
        if (user[0] === chat[1].members[1] && user[1].enableChat) {
          let u = {
            ...user[1],
            lastMessage: chat[1]?.lastMessageSent,
            unSeenCount: chat[1]?.userUnseenCount,
          };
          _myUsers.push(u);
        }
      });
    });
    setUsersLists(_myUsers);
    getLastmessage(_myUsers);
  }, [vendorChats, vendorUsers]);

  useEffect(() => {
    let _date = usersList.sort(function (a: any, b: any) {
      var key1 = a.dateTime;
      var key2 = b.dateTime;

      if (key1 > key2) {
        return -1;
      } else if (key1 == key2) {
        return 0;
      } else {
        return 1;
      }
    });
    setSortedUserList(_date);
  }, [usersList]);

  const getUsers = () => {
    const usersRef: any = ref(db, "Users");
    return onValue(
      usersRef,
      (snapshot) => {
        const users: any = [];
        if (snapshot.val()) {
          Object.entries(snapshot.val()).map((member: any) => {
            users.push(member);
          });
          setVendorUsers(users);
          setIsLoading(false);
        } else {
          console.log("No data available");
          setIsLoading(false);
        }
      },
      {
        onlyOnce: false,
      }
    );
  };
  const handleSelectedUser = (_user: any) => {
    setSelectedUser(_user);
  };
  const handleSearchMessage = (e: any) => {
    let _search = e.target.value;
    let _userList = _MyUsers.filter((user: any) => {
      return user.userDisplayName.toLowerCase().includes(_search.toLowerCase());
    });
    setUsersLists(_userList);
  };
  const getLastmessage = (_myUsers: any) => {
    const chatMessagesRef: any = ref(db, "ChatMessages");
    return onValue(
      chatMessagesRef,
      (snapshot) => {
        if (snapshot.val()) {
          let chatMessages: any = [];
          _myUsers.map((_lastMessage: any) => {
            return Object.entries(snapshot.val()).map((messages: any) => {
              Object.entries(messages[1]).map((message: any) => {
                if (message[0] === _lastMessage?.lastMessage) {
                  chatMessages.push({
                    ..._lastMessage,
                    type: message[1]?.type,
                    message: message[1]?.message,
                    dateTime: new Date(message[1]?.messageDateTime),
                  });
                }
              });
            });
          });
          _MyUsers = chatMessages;
          setUsersLists(chatMessages);
          setIsLoading(false);
        } else {
          console.log("No data available");
          setIsLoading(false);
        }
      },
      {
        onlyOnce: false,
      }
    );
  };

  return (
    <>
      <CustomCard styleClass="rounded-none">
        <div className="flex">
          <div className="w-[30%]">
            <h4 className="h-16 text-left px-2 flex items-center border text-gray-500 font-semibold">
              <Input
                className="w-full"
                name="search"
                type="text"
                leftIcon={<SearchIcon />}
                placeholder="Search the vendor"
                handldChange={handleSearchMessage}
              />
            </h4>
            <Spinner isLoading={isLoading} classname="my-40" />
            {sortedUserList.map((user: any) => (
              <div
                key={Math.random()}
                className="border-b h-16 flex flex-col justify-center cursor-pointer"
                onClick={() => handleSelectedUser(user)}
              >
                <div className="flex mx-2">
                  {user?.userPhotoUrl ? (
                    <img
                      className="w-[45px] h-[40px] rounded-full"
                      src={
                       
                        user?.userPhotoUrl
                      }
                      alt=""
                    />
                  ) : (
                    <img
                      className="w-[45px] h-[40px] rounded-full"
                      src={noImage}
                      alt=""
                    />
                  )}
                  <div className="ml-2 w-full">
                    <div className="flex justify-between">
                      <p
                        className="text-black-100 text-left font-semibold truncate w-[280px]"
                        key={user.id}
                      >
                        {user.userDisplayName !== "null"
                          ? user.userDisplayName
                          : user.userEmail}
                      </p>
                      <div className="flex items-start">
                        <div>
                          {/* <p
                            className="text-gray-500 text-left text-[10px]"
                            key={user.id}
                          >
                            {user?.dateTime?.toLocaleTimeString("default") ??
                              ""}
                          </p> */}
                          <p
                            className="text-gray-500 text-left text-[10px]"
                            key={user.id}
                          >
                            {user?.dateTime?.toLocaleDateString("en-GB") ?? ""}
                          </p>
                        </div>
                        {user?.unSeenCount && user?.id !== selectedUser?.id ? (
                          <p className="bg-red-100 rounded-full h-4 w-4 text-[10px] flex items-center justify-center ml-1">
                            {user?.unSeenCount}
                          </p>
                        ) : null}
                      </div>
                    </div>
                    <p
                      className="text-gray-500 text-left text-sm truncate w-[280px]"
                      key={user.id}
                    >
                      {user?.type === "image" ? "Image" : user.message}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="w-[70%]">
            <ChatWithCustomer selectedUser={selectedUser} />
          </div>
        </div>
      </CustomCard>
    </>
  );
};
export default ChatList;
