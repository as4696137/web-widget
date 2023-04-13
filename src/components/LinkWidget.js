import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import webDefultImage from "../svg/globe-solid.svg";
import editImage from "../svg/pen-solid.svg";
import deleteImage from "../svg/trash-solid.svg";
import { Scrollbars } from "react-custom-scrollbars-2";
import { app, auth } from "./GoogleLoginSystem";
import { getDatabase, ref, onValue, set } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";

const LinkWidget_style = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
  justify-content: start;
  align-items: flex-start;
  align-content: flex-start;
  a.link-app {
    height: fit-content;
    margin: 1rem 0 0 1rem;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    position: relative;
    color: black;
    text-decoration: none;

    &:hover {
      cursor: pointer;
      button.edit-app {
        opacity: 1;
      }
      div.icon {
        background-color: #818181;
      }
    }

    button.edit-app {
      height: 1.5rem;
      width: 1.5rem;
      border: none;
      border-radius: 0.75rem;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: -0.5rem;
      right: -0.5rem;
      opacity: 0;
      transition: all 0.2s ease-in-out;
      background-color: #e9e9e9;
      &:hover {
        cursor: pointer;
        background-color: #ffffff;
      }

      img {
        height: 0.75rem;
        width: 0.75rem;
      }
    }

    div.icon {
      height: 3.25rem;
      width: 3.25rem;
      border-radius: 0.5rem;
      background-color: #6b6b6b;

      display: flex;
      justify-content: center;
      align-items: center;
      img {
        height: 2rem;
        width: 2rem;
      }
    }

    p {
      font-size: 0.8rem;
      padding-top: 0.3rem;
      line-height: 1rem;
    }
  }
  div.addLink {
    margin: 1rem 0 0 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    &:hover {
      cursor: pointer;
      div.icon {
        background-color: #818181;
      }
    }
    div.icon {
      height: 3.25rem;
      width: 3.25rem;
      border: none;
      border-radius: 0.5rem;
      font-size: 2.5rem;
      background-color: #6b6b6b;
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    p {
      font-size: 0.8rem;

      padding-top: 0.1rem;
    }
  }
`;

const StyledScrollbars = styled(Scrollbars)`
  height: 200px;
  width: 100px;

  /* Hide the default scrollbar */
  ::-webkit-scrollbar {
    display: none;
  }

  /* Style the thumb */
  ::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 10px;
  }

  /* Style the track */
  ::-webkit-scrollbar-track {
    background-color: #eee;
  }
`;

//======= popup edit button =======
const PopupEditButton = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  div.popup {
    width: 200px;
    background-color: white;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: start;
    button {
      display: flex;
      align-items: center;
      img {
        height: 1rem;
        width: 1rem;
        margin: 0 0.2rem;
      }
    }
  }
`;

//======= popup delete link =======
const PopupAddLink = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  div.popup {
    width: 200px;
    height: 200px;
    background-color: white;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    div.input {
      margin: 0.3rem;
      display: flex;
      flex-direction: column;
    }
    div.button {
      text-align: end;
      button {
        margin: 0.3rem;
      }
    }
  }
`;

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
        setLinkList([]);
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

    //==== 當路徑一樣就不加新的 ====
    if (
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
    <StyledScrollbars autoHide autoHideTimeout={1000} autoHideDuration={200}>
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
          <div className="icon">+</div>
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
                <label htmlFor="web-name">名稱</label>
                <input
                  id="web-name"
                  type="text"
                  placeholder="網站名稱"
                  onChange={webNameInputHandler}
                  value={inputData.webName}
                />
                <label htmlFor="web-link">網址</label>
                <input
                  id="web-link"
                  type="text"
                  placeholder="網址"
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
  );
};

export default LinkWidget;