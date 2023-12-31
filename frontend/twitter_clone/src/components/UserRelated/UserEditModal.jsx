import React, { useEffect, useState, useRef } from "react";
import { userEdit } from "../../redux/asyncActions/UserAsync";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import coverImg from "../profile/anonymous.jpg";
const UserEditModal = ({ user, modalId }) => {
  const dispatch = useDispatch();
  // console.log("sssss");
  // console.log("ssss" + user);
  const { username } = useParams;
  const [bio, setBio] = useState(user?.bio);
  const [firstName, setFirstName] = useState(user?.firstname);
  const [lastName, setLastName] = useState(user?.lastname);
  const [gender, setGender] = useState(user?.gender);

  const [nickname, setNickname] = useState(user?.nickname || "");
  const inputOpenFileRef = useRef(null);
  const inputAvatarFileRef = useRef(null);
  const [avatar, setAvatar] = useState();
  const [cover, setCover] = useState();
  const [prevCoverImage, setPrevCoverImage] = useState(false);
  const [prevAvatarImage, setPrevAvatarImage] = useState(false);
  useEffect(() => {
    //bootstrap tooltip
    // window.$('[data-toggle="tooltip"]').tooltip();
  }, []);
  const showOpenFileDlg = () => {
    inputOpenFileRef.current.click();
    // console.log("clicked to cover image");
  };
  const showAvatarFileDlg = () => {
    inputAvatarFileRef.current.click();
    // console.log("clicked to profile image");
  };
  const imageChanged = (e) => {
    setCover(e.target.files[0]);
    setPrevCoverImage(URL.createObjectURL(e.target.files[0]));
  };
  const AvatarChanged = (e) => {
    setAvatar(e.target.files[0]);
    setPrevAvatarImage(URL.createObjectURL(e.target.files[0]));
  };

  const updateUser = () => {
    // console.log("asdddd");
    // console.log(cover);
    const jsonData = localStorage.getItem("userData");
    const dataObject = JSON.parse(jsonData);
    // setPrevCoverImage = dataObject.data.cover_pic;
    // console.log(user?.username +"asr")
    // console.log("update user running");
    const uploadData = new FormData();
    cover && uploadData.append("cover_pic", cover);
    avatar && uploadData.append("profile_pic", avatar);
    uploadData.append("bio", bio);
    uploadData.append("first_name", firstName);
    uploadData.append("last_name", lastName);
    uploadData.append("gender", gender);
    // console.log(uploadData);

    dispatch(
      userEdit(
        dataObject.data.username,
        firstName,
        lastName,
        bio,
        gender,
        avatar,
        cover,
        uploadData
      )
    );
  };
  return (
    <div
      className="modal fade"
      id={`${modalId}`}
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered " role="document">
        <div className="modal-content modal-custom-css">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLongTitle">
              Edit Profile
            </h5>
          </div>
          <div id="modalId" className="modal-body custom-modal-body">
            <div style={{ position: "relative" }}>
              <input
                onChange={imageChanged}
                ref={inputOpenFileRef}
                type="file"
                name="cover_pic"
                style={{ display: "none" }}
              />
              <img
                onClick={() => showOpenFileDlg()}
                src={prevCoverImage ? prevCoverImage : coverImg}
                alt="cover"
                className="cover-edit"
                data-toggle="tooltip"
                title="Change Cover Image"
                data-placement="bottom"
              />
              <input
                onChange={AvatarChanged}
                ref={inputAvatarFileRef}
                type="file"
                style={{ display: "none" }}
              />
              <img
                onClick={() => showAvatarFileDlg()}
                src={prevAvatarImage ? prevAvatarImage : coverImg}
                alt="profile "
                className="rounded-circle profile-image"
                data-toggle="tooltip"
                title="Change Profile Image"
                data-placement="bottom"
              />
            </div>
            <div style={{ marginTop: "15%" }}>
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                name="text"
                placeholder="Add First Name"
                className="inputTag"
              />

              <br />
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                name="text"
                placeholder="Add Last Name"
                className="inputTag"
              />

              <br />
              <input
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                type="text"
                name="text"
                placeholder="Add Bio"
                className="inputTag"
              />

              <br />
              <input
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                type="text"
                name="text"
                placeholder="Add Gender"
                className="inputTag"
              />

              <br />
              {/* <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              type="text"
              name="text"
              placeholder="nickname"
              className="inputTag"
            ></textarea> */}
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-danger"
              data-dismiss="modal"
              onClick={() => {
                setPrevCoverImage("");
                setPrevAvatarImage("");
              }}
            >
              Cancel
            </button>
            <button
              onClick={updateUser}
              type="button"
              data-dismiss="modal"
              className="btn btn-outline-success"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserEditModal;
