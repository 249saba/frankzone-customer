import React, { useEffect, useState, useRef } from "react";
import CustomCard from "@src/shared/cards/customCard";
import StartYellowIcon from "@assets/images/icons/star_yellow.svg";
import telephone from "@assets/icons/telephone1.png";
import more from "@assets/icons/more.png";
import noImage from "@assets/images/NoImage.png";
import fileAttache from "@assets/icons/fileAttache.png";
import send from "@assets/icons/send.png";
import LazyImage from "@src/shared/lazyImage";
import { backendCall } from "@src/shared/utils/backendService/backendCall";
import { useParams } from "react-router-dom";
import ChatDisabledIcon from "@assets/icons/ChatDisabledIcon.png";
import { formatedDate } from "@src/shared/dateFormat";
import Input from "@src/shared/input";
import CustomButton from "@src/shared/customButton";
import {
  child,
  get,
  getDatabase,
  onValue,
  push,
  ref,
  update,
} from "firebase/database";
import { app } from "@src/firebaseConfig";
import { GetStorage } from "@src/shared/utils/authService";
import { handleToastMessage } from "@src/shared/toastify";
import ImagePicker from "@src/shared/imagePicker/imagePicker";
import Popup from "@src/shared/popup/popup";
import { UploadFileS3Bucket } from "@src/shared/s3Bucket";
import { ModuleType } from "@src/shared/enum";
import { Spinner } from "@src/shared/spinner/spinner";
const dbPath_Users = "/Users";
const dbPath_Chats = "/Chats";
const dbPath_chatMessages = "/ChatMessages";
const db = getDatabase(app);
let _message = [
  { name: "send", message: "test1" },
  { name: "send", message: "test1" },
  { name: "receive", message: "test1" },
  { name: "send", message: "test1" },
  { name: "receive", message: "test1" },
];
const defaultmessage = {
  isSender: true,
  messageDateTime: formatedDate(new Date()),
  message:
    "Welcome to the Frankzone Vendor. Your questions answered within 24 hours. ",
};
const ChatWithCustomer = ({ selectedUser }: any) => {
  const params = useParams();
  const [textMessage, setTextMessage] = useState("");
  const [userId, setUserId] = useState<any>("");
  const [chatKey, setChatKey] = useState();
  const [isMessageLoading, setIsMessageLoading] = useState(false);
  const [messsagesList, setMessagesList] = useState<any>([]);
  const [adminId, setAdminId] = useState(selectedUser?.id);
  const [uploadedImage, setUploadedImage] = useState("");
  const [imageFile, setImageFile] = useState<any>("");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenImage, setIsOpenImage] = useState(false);
  const [imageURL, setImageURL] = useState("");

  // const [adminId, setAdminId] = useState(params?.id + "_customer");
  const messagesEndRef: any = useRef(null);

  useEffect(() => {
    const _getStorage = async () => {
      let _userData: any = await GetStorage();
      setUserId(_userData.id + "_customer");
    };
    _getStorage();
  }, []);
  useEffect(() => {
    if (userId) {
      startChat();
    }
  }, [userId, selectedUser]);

  useEffect(() => {
    if (chatKey) {
      getMessages();
      updateChatsThread(chatKey);
    }
    return () => updateChatsThread(chatKey);
  }, [chatKey]);

  useEffect(() => {
    if (adminId && userId) {
      getChats();
    }
  }, [adminId, userId]);

  useEffect(() => {
    scrollToBottom();
  }, [messsagesList]);

  const startChat = () => {
    getAdminId();
  };

  const getChats = async () => {
    let _userData: any = await GetStorage();
    const dbChatRef = ref(db, dbPath_Chats);
    setIsMessageLoading(true);
    onValue(dbChatRef, (span) => {
      let _chats = span.val();
      let _chat;
      if (_chats) {
        _chats = Object.entries(_chats);
        let _chatlist = _chats.map((chatModel: any) => {
          const { members, lastMessageSent } = chatModel[1];
          let _chatListModel = {
            chatkey: chatModel[0],
            members: members,
            lastMessageSent: lastMessageSent,
          };
          return _chatListModel;
        });
        _chat = _chatlist.find(
          (filterChat: any) =>
            filterChat?.members?.includes(adminId) &&
            filterChat?.members?.includes(_userData.id + "_customer")
        );
      } else {
        _chats = [];
      }
      if (_chat) {
        setChatKey(_chat.chatkey);
      } else {
        addChat();
      }
    });
  };
  const addChat = () => {
    let _chatsModel = {
      lastMessageSent: "",
      members: [userId, adminId],
      adminUnseenCount: 0,
      userUnseenCount: 0,
    };
    const newPostKey: any = adminId.toString() + userId.toString();
    const updates: any = {};
    updates[`${dbPath_Chats}/${newPostKey}`] = _chatsModel;
    update(ref(db), updates);
    setChatKey(newPostKey);
  };
  const getAdminId = () => {
    setAdminId(selectedUser?.id);
  };
  const getMessages = () => {
    const dbChatMessagesRef = ref(db, `${dbPath_chatMessages}/${chatKey}`);
    onValue(dbChatMessagesRef, (span: any) => {
      let _messagesList: any = [];
      setIsMessageLoading(false);
      let _dbMessages = span.val();
      if (_dbMessages) {
        _dbMessages = Object.entries(_dbMessages);
        _messagesList = _dbMessages.map((messageModel: any) => {
          const { message, messageDateTime, sentBy, type } = messageModel[1];
          let _messageModel: any = {};
          _messageModel.id = messageModel[0];
          _messageModel.isSender = sentBy === userId ? true : false;
          _messageModel.message = message;
          _messageModel.type = type;
          _messageModel.messageDateTime = new Date(messageDateTime);
          // ? formatedDate(messageDateTime)
          // : "";
          return _messageModel;
        });
      }
      // _messagesList.unshift(defaultmessage);
      setMessagesList([..._messagesList]);
      scrollToBottom();
    });
  };
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };
  useEffect(() => {}, []);
  const handleMessage = (e: any) => {
    setTextMessage(e.target.value);
  };
  const onEnterClick = (e: any) => {
    if (e.keyCode == 13 && e.shiftKey == false) {
      e.preventDefault();
      sendMessage("text", "");
    }
  };
  const sendMessage = (type: any, _imageurl: any) => {
    let _messageThread: any = {};
    if (type === "image") {
      _messageThread.message = _imageurl;
      setIsOpen(false);
      setUploadedImage("");
    } else {
      if (!textMessage?.trim()) {
        return;
      }
      _messageThread.message = textMessage;
    }
    _messageThread.sentBy = userId;
    _messageThread.type = type;
    _messageThread.messageDateTime = new Date().getTime();
    const _lastMessageKey: any = push(
      child(ref(db), `${dbPath_chatMessages}/${chatKey}`)
    ).key;

    const updates: any = {};
    updates[`${dbPath_chatMessages}/${chatKey}/${_lastMessageKey}`] =
      _messageThread;
    update(ref(db), updates);

    updateChatsThread(chatKey, _lastMessageKey);
    setTextMessage("");
  };
  const getImageURL = () => {
    sendMessage("image", imageFile);
    // backendCall({
    //   url: `/api/user/upload_file`,
    //   method: "POST",
    //   data: { file: imageFile },
    //   contentType: "multipart/form-data;",
    // }).then((res) => {
    //   if (res && !res.error) {
    //     sendMessage("image", res?.data?.file_url);
    //     setIsOpen(false);
    //   } else {
    //     handleToastMessage("error", res.message);
    //   }
    // });
  };
  const handleUploadClick = async (files: any) => {
    setIsOpen(true);
    const s3File: any = await UploadFileS3Bucket(files[0], ModuleType?.Chats);
    setUploadedImage(s3File);
    setImageFile(s3File);
  };
  const handleOpenImage = (imageUrl: any) => {
    setImageURL(imageUrl);
    setIsOpenImage(true);
  };
  const handleCloseImagePopup = (imageUrl: any) => {
    setIsOpen(false);
    setUploadedImage("");
  };
  const updateChatsThread = (chatKey: any, lastMessageKey = "") => {
    const updates: any = {};
    const dbRef = ref(getDatabase());
    get(child(dbRef, `${dbPath_Chats}/${chatKey}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          let _fbChatModel = snapshot.val();
          let _unseenCount = 0;
          if (
            _fbChatModel?.adminUnseenCount !== undefined ||
            _fbChatModel?.adminUnseenCount !== null
          ) {
            _unseenCount = lastMessageKey
              ? _fbChatModel?.adminUnseenCount + 1
              : _fbChatModel?.adminUnseenCount;
          }
          let _chatModel = {
            lastMessageSent: lastMessageKey
              ? lastMessageKey
              : _fbChatModel?.lastMessageSent,
            members: _fbChatModel.members,
            userUnseenCount: 0,
            adminUnseenCount: _unseenCount,
          };
          updates[`${dbPath_Chats}/${chatKey}`] = _chatModel;
          update(ref(db), updates);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const isURL = (content: any) => {
    const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    if (urlPattern.test(content)) {
      return isImageURL(content);
    } else {
      return urlPattern.test(content);
    }
  };
  const isImageURL = (url: any) => {
    // Define an array of image file extensions
    const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "svg"];

    // Extract the file extension from the URL
    const fileExtension = url.split(".").pop().toLowerCase();

    // Check if the file extension is in the imageExtensions array
    return imageExtensions.includes(fileExtension);
  };
  return selectedUser.id ? (
    <div className="border  bg-white">
      <Popup
        isOpen={isOpen}
        handleClose={handleCloseImagePopup}
        isShowHeader={true}
        width={"auto"}
      >
        {uploadedImage ? (
          <>
            <img src={uploadedImage} className="h-[450px] w-full" />
            <div className="flex justify-end mt-2" onClick={getImageURL}>
              <img
                src={send}
                width={40}
                height={40}
                className="cursor-pointer"
              />
            </div>
          </>
        ) : (
          <div className="h-[450px] w-72 flex justify-center items-center">
            <Spinner isLoading />
          </div>
        )}
      </Popup>
      <Popup
        isOpen={isOpenImage}
        handleClose={() => setIsOpenImage(false)}
        isShowHeader={true}
        width={"auto"}
      >
        <img src={imageURL} className="h-[450px] w-full" />
      </Popup>

      <div className="flex justify-between items-center border px-4 py-2">
        <div className="flex items-center">
          <div className="h-11">
            {selectedUser.id ? (
              <LazyImage
                className="w-[40px] h-[40px] rounded-full"
                src={
                  selectedUser?.userPhotoUrl
                    ? selectedUser?.userPhotoUrl
                    : noImage
                }
                alt=""
              />
            ) : null}
          </div>
          <div className="text-left ml-3">
            <p className="text-black-100 font-semibold">
              {selectedUser.userDisplayName !== "null"
                ? selectedUser.userDisplayName
                : selectedUser.userEmail}
            </p>
            {/* <div className="flex">
              <p className="text-gray-900 text-xs ">
                {"Last Seen 23 Minutes Ago"}
              </p>
            </div> */}
          </div>
        </div>
        <p className="text-black-100 flex justify-between w-10">
          <LazyImage src={telephone} alt="" width="20" height="20" />
          <LazyImage src={more} alt="" width="4" />
        </p>
      </div>

      <div className="h-[450px] overflow-y-scroll">
        {messsagesList?.map((message: any) => (
          <div
            className={`flex items-start px-4 my-4 ${
              message?.isSender ? "justify-end" : "justify-start"
            }`}
          >
            {message?.type === "image" ? (
              <div className="max-w-[50%]">
                <div
                  className={`${
                    message?.isSender
                      ? "border-[#7580F2] border-2"
                      : "border-[#F3F3F3] border-2"
                  } rounded-md`}
                  onClick={() => {
                    handleOpenImage(message?.message);
                  }}
                >
                  <p
                    className={`${
                      message?.isSender ? "text-white" : "text-black-100"
                    } text-left font-semibold`}
                  >
                    {message?.name}
                  </p>
                  <img
                    className="rounded-sm max-h-96 min-h-[100px] w-auto"
                    src={message?.message}
                  />
                </div>
                <p className="text-xs text-right text-gray-500">
                  {message.messageDateTime.toLocaleTimeString("default")}
                </p>
              </div>
            ) : (
              <div className="max-w-[50%]">
                <div
                  className={`${
                    message?.isSender ? "bg-[#7580F2]" : "bg-[#F3F3F3]"
                  } p-4 pt-2 rounded-md ml-4 `}
                >
                  <p
                    className={`${
                      message?.isSender ? "text-white" : "text-black-100"
                    } text-left font-semibold pb-2`}
                  >
                    {message?.name}
                  </p>
                  <p
                    className={`${
                      message?.isSender ? "text-white" : "text-black-100"
                    } text-left break-all whitespace-pre-line`}
                    ref={messagesEndRef}
                  >
                    {message?.message}{" "}
                  </p>
                </div>
                <p className="text-xs text-right text-gray-500">
                  {message.messageDateTime.toLocaleTimeString("default")}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center border px-4 py-2">
        <div className="flex items-center w-[90%]">
          <textarea
            className="w-full bg-gray-light border border-gray-light focus:outline-transparent rounded-lg text-black-100 border-solid border-blue-placeholder focus:border-blue-cta focus:border-[2px] px-2 py-1"
            name="message"
            // type="text"
            placeholder="Hey, My name is codesorbit"
            onChange={handleMessage}
            onKeyDown={(e: any) => onEnterClick(e)}
            value={textMessage}
          />
        </div>
        <div className="text-black-100 flex justify-between px-4 items-center">
          <div>
            <ImagePicker
              className="flex-1"
              value={uploadedImage}
              resetValue={() => {
                setUploadedImage("");
              }}
              removeImage={(index) => {
                const temp_profile: any = uploadedImage;
                temp_profile.splice(index, 1);
                setUploadedImage(temp_profile);
              }}
              onChange={(files) => {
                return handleUploadClick(files);
              }}
              onSizeError={(error) => {
                handleToastMessage(
                  "error",
                  "please select image of size less than 10mb"
                );
              }}
              touched={true}
            >
              <LazyImage
                className="cursor-pointer"
                src={fileAttache}
                alt=""
                width="60"
                height="60"
              />
            </ImagePicker>
          </div>

          <CustomButton
            label="Send"
            type={"submit"}
            handleButtonClick={(e: any) => sendMessage("text", "")}
            styleClass="btn-black !rounded-lg w-full ml-4"
          />
        </div>
      </div>
    </div>
  ) : (
    // <div className="border  bg-white h-[450px] overflow-y-scroll flex justify-center items-center ">
    //   <h3 className="text-gray-900">Select the vendor from the list</h3>
    // </div>
    <CustomCard styleClass="rounded-none ">
      <div className="flex flex-col items-center justify-center h-[600px]">
        <LazyImage src={ChatDisabledIcon} alt="" className="h-28 w-44" />
        <h5 className="font-semibold mt-10">No New Messages In Inbox</h5>
      </div>
    </CustomCard>
  );
};

export default ChatWithCustomer;
