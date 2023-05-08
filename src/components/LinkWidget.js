import React, { useState, useEffect, useRef } from "react";

//img
import webDefultImage from "../img/svg/globe-solid.svg";
import editImage from "../img/svg/pen-solid.svg";
import deleteImage from "../img/svg/trash-solid.svg";
import addLinkImg from "../img/svg/link-+.svg";

//auth & database
import { app, auth } from "./GoogleLoginSystem";
import { getDatabase, ref, onValue, set } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";

//style
import {
  Title,
  LinkWidget_style,
  PopupEditButton,
  PopupAddLink,
  StyledScrollbars,
} from "./style components/LinkWidget_style";

const db = getDatabase(app);

const LinkWidget = ({ user, setUser }) => {
  const [linkList, setLinkList] = useState([
    { title: "YouTube", url: "https://www.youtube.com/" },
    {
      title: "個人頁面",
      url: "https://creator.line.me/my/eQ0LeWMXRKbbILV5/sticker/",
    },
    { title: "翻譯", url: "https://translate.google.com.tw/?hl=zh-TW" },
    { title: "原價屋", url: "https://www.coolpc.com.tw/evaluate.php" },
    { title: "trading", url: "https://www.tradingview.com/" },
    { title: "試算表", url: "https://docs.google.com/spreadsheets/u/0/" },
    { title: "Poe", url: "https://poe.com/sage" },
    { title: "Openai", url: "https://openai.com/" },
    { title: "medium", url: "https://medium.com/" },
    { title: "Gmail", url: "https://mail.google.com/" },
    { title: "MDN", url: "https://developer.mozilla.org/" },
    { title: "npm", url: "https://www.npmjs.com/" },
    { title: "React", url: "https://legacy.reactjs.org/" },
  ]);
  const [show_addlink_popup, set_show_addlink_popup] = useState(false);
  const [show_editbutton_popup, set_show_editbutton_popup] = useState(false);
  const [inputData, setInputData] = useState({ webName: "", webLink: "" });
  const [editData, setEditData] = useState({ webName: "", webLink: "" });

  useEffect(() => {
    //get user's stock adding list data
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const linkListRef = ref(db, `users/${user.uid}/linkList`);
        onValue(linkListRef, (snapshot) => {
          const linkData = snapshot.val();
          const linkList = [];
          for (let id in linkData) {
            linkList.push({ id, ...linkData[id] });
          }
          setLinkList(linkList);
        });
      } else {
        setUser(null);
        setLinkList([...linkList]);
      }
    });
  }, []);

  useEffect(() => {
    if (user) {
      const linkListRef = ref(db, `users/${user.uid}/linkList`);
      set(linkListRef, linkList);
    }
  }, [linkList]);

  const addLinkHandler = () => {
    set_show_addlink_popup(true);
  };

  const webNameInputHandler = (e) => {
    setInputData({ ...inputData, webName: e.target.value });
  };

  const webLinkInputHandler = (e) => {
    setInputData({ ...inputData, webLink: e.target.value });
  };

  const cancelBtnHandler = (e) => {
    e.preventDefault();
    setInputData({ webName: "", webLink: "" });
    set_show_addlink_popup(false);
  };

  const saveLinkBtnHandler = (e) => {
    e.preventDefault();

    //==== 超過20個就不能加了 ====
    if (linkList.length >= 20) {
      console.log("max link list length.");
    }

    //==== 當路徑一樣就不加新的 ====
    else if (
      linkList.length !== 0 &&
      editData.webName === "" &&
      editData.webLink === "" &&
      linkList.some((link) => {
        const url1 = new URL(link.url.replace(/\/$/, ""));
        const url2 = new URL(inputData.webLink.replace(/\/$/, ""));
        return url1.href === url2.href;
      })
    ) {
      setInputData({ webName: "", webLink: "" });
      set_show_addlink_popup(false);
    }

    //==== 當重新編輯資料 ====
    else if (editData.webName !== "" && editData.webLink !== "") {
      setLinkList(
        linkList.map((link) => {
          if (link.url === editData.webLink) {
            link.title = inputData.webName;
            link.url = inputData.webLink;
          }
          return link;
        })
      );

      setEditData({ webName: "", webLink: "" });
      setInputData({ webName: "", webLink: "" });
      set_show_addlink_popup(false);
    } else {
      setLinkList([
        ...linkList,
        { title: inputData.webName, url: inputData.webLink },
      ]);
      setInputData({ webName: "", webLink: "" });
      set_show_addlink_popup(false);
    }
  };

  const imgLinkHandler = (url) => {
    const parsedUrl = new URL(url);
    const URLhostname = parsedUrl.hostname;
    const imgURL = `https://complicated-violet-ant.faviconkit.com/${URLhostname}/128`;

    if (imgURL) {
      return imgURL;
    } else {
      return webDefultImage;
    }
  };

  // ======  Edit Button ======

  const editButtonHandler = (link, event) => {
    event.preventDefault();
    event.stopPropagation();
    setEditData({ webName: link.title, webLink: link.url });
    set_show_editbutton_popup(true);
  };

  const deleteLinkHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setLinkList(linkList.filter((link) => link.title !== editData.webName));
    setEditData({ webName: "", webLink: "" });
    set_show_editbutton_popup(false);
  };

  const editLinkButtonHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setInputData({ webName: editData.webName, webLink: editData.webLink });
    set_show_editbutton_popup(false);
    set_show_addlink_popup(true);
  };

  return (
    <>
      <Title>連結收藏</Title>
      <StyledScrollbars
        show_addlink_popup={show_addlink_popup}
        show_editbutton_popup={show_editbutton_popup}
      >
        <LinkWidget_style>
          {linkList &&
            linkList.map((link, index) => (
              <a
                className="link-app"
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button
                  className="edit-app"
                  onClick={(event) => editButtonHandler(link, event)}
                >
                  <img src={editImage} alt="Pen Solid" />
                </button>

                <div className="icon">
                  <img src={imgLinkHandler(link.url)} alt="" />
                </div>

                <p>{link.title}</p>
              </a>
            ))}

          <div className="addLink" onClick={addLinkHandler}>
            <div className="icon">
              <img src={addLinkImg} alt="add link button" />
            </div>
            <p>新增網站</p>
          </div>

          {show_editbutton_popup ? (
            <PopupEditButton onClick={() => set_show_editbutton_popup(false)}>
              <div className="popup" onClick={(e) => e.stopPropagation()}>
                <button className="edit" onClick={editLinkButtonHandler}>
                  <img src={editImage} alt="edit" />
                  編輯
                </button>
                <button className="delete" onClick={deleteLinkHandler}>
                  <img src={deleteImage} alt="delete" />
                  移除
                </button>
              </div>
            </PopupEditButton>
          ) : null}

          {show_addlink_popup ? (
            <PopupAddLink
              onMouseDown={() => {
                set_show_addlink_popup(false);
              }}
            >
              <div className="popup" onMouseDown={(e) => e.stopPropagation()}>
                <div className="input">
                  <label className="web-name" htmlFor="web-name">
                    名稱
                  </label>
                  <input
                    id="web-name"
                    type="text"
                    placeholder="填寫網站名稱"
                    maxLength="12"
                    onChange={webNameInputHandler}
                    value={inputData.webName}
                  />
                  <label className="web-link" htmlFor="web-link">
                    網址
                  </label>
                  <input
                    id="web-link"
                    type="text"
                    placeholder="填寫網址"
                    onChange={webLinkInputHandler}
                    value={inputData.webLink}
                  />
                </div>

                <div className="button">
                  <button id="cancel" onClick={cancelBtnHandler}>
                    取消
                  </button>
                  <button id="save" onClick={saveLinkBtnHandler}>
                    儲存
                  </button>
                </div>
              </div>
            </PopupAddLink>
          ) : null}
        </LinkWidget_style>
      </StyledScrollbars>
    </>
  );
};

export default LinkWidget;
