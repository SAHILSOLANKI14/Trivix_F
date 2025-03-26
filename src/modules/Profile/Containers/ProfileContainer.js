// import React, { useEffect } from "react";
// import { Grid, Header, Image, TabPane } from "semantic-ui-react";
// import profilePic from "../../../assets/images/Ellipse 194.svg";
// import { Button } from "../../../shared";
// import { theme } from "../../../Theme/theme";
// import TabExampleSecondaryPointing from "../Components/Tabs";
// import { useDispatch, useSelector } from "react-redux";
// import ImageGroupSize from "../../../components/ImageGroup";
// import img from "../../../assets/images/ai-generated-mysterious-night-sky-illuminates-tranquil-forest-revealing-cosmic-beauty-generated-by-ai-photo.jpg";
// import Tweets from "../Components/Tweets";
// import { getTweetsRequest } from "../Actions";
// import { GetCurrentLogedInAgency, getFollowers, getFollowings } from "../Api";
// import Cookies from "js-cookie";

// const ProfileContainer = () => {
//   const { Data } = useSelector((state) => state.auth);
//   console.log(Data.agency);
//   const data = Data.agency || Data.traveler;
//   const PostImage = [
//     {
//       src: img,
//     },
//     {
//       src: img,
//     },
//     {
//       src: img,
//     },
//     {
//       src: img,
//     },
//     {
//       src: img,
//     },
//     {
//       src: img,
//     },
//   ];
//   const panes = [
//     {
//       menuItem: "Post",
//       render: () => (
//         <TabPane
//           attached={false}
//           style={{
//             background: "transparent",
//             border: "none",
//             boxShadow: "none",
//             color: theme.colors.black,
//           }}
//         >
//           <ImageGroupSize PostImage={PostImage} />
//         </TabPane>
//       ),
//     },
//     {
//       menuItem: "Tweet",
//       render: () => (
//         <TabPane
//           attached={false}
//           style={{
//             background: "transparent",
//             border: "none",
//             boxShadow: "none",
//             marginBottom: "50px",
//           }}
//         >
//           <Tweets />
//         </TabPane>
//       ),
//     },
//     {
//       menuItem: "Video",
//       render: () => (
//         <TabPane
//           attached={false}
//           style={{
//             background: "transparent",
//             border: "none",
//             boxShadow: "none",
//           }}
//         >
//           In Development
//         </TabPane>
//       ),
//     },
//     {
//       menuItem: "Tag",
//       render: () => (
//         <TabPane
//           attached={false}
//           style={{
//             background: "transparent",
//             border: "none",
//             boxShadow: "none",
//           }}
//         >
//           In Development
//         </TabPane>
//       ),
//     },
//   ];
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const userID = Cookies.get("userId");
//     const userType = Cookies.get("userType");
//     const userName = data?.userName || data?.userName;
//     const Datas = {
//       userId: userID,
//       userType: userType,
//     };
//     // GetCurrentLogedInAgency();
//     dispatch(getTweetsRequest(Datas));
//     getFollowers(userName);
//     getFollowings(userName);
//   }, [dispatch]);
//   return (
//     <>
//       <Grid columns={"equal"} fluid>
//         <Grid.Row>
//           <Grid.Column width={16}></Grid.Column>
//         </Grid.Row>
//         <Grid.Row>
//           <Grid.Column textAlign="center" width={8} mobile={16} computer={8}>
//             <div>
//               <div
//                 style={{
//                   marginTop: "-20px",
//                 }}
//               >
//                 <Image
//                   src={profilePic}
//                   centered
//                   style={{ width: "80px", height: "80px" }}
//                 />
//                 <Header
//                   as={"h3"}
//                   style={{
//                     margin: "0",
//                     color: theme.colors.black,
//                     padding: "5px ",
//                   }}
//                 >
//                   {data?.agencyName || data?.fullName}
//                 </Header>
//                 <Header
//                   as={"h5"}
//                   style={{
//                     margin: "0",
//                     fontWeight: "300",
//                     color: theme.colors.gray,
//                     marginBottom: "10px",
//                   }}
//                 >
//                   {data?.userName || "Trivix__01"}
//                 </Header>
//               </div>
//               <div
//                 style={{
//                   marginBottom: "10px",
//                 }}
//               >
//                 <Header
//                   as={"h5"}
//                   style={{
//                     fontSize: "12px",
//                     fontWeight: "300 !important",
//                     color: theme.colors.black,
//                   }}
//                 >
//                   {data?.bio ||
//                     "Explore. Dream. Discover. Your Journey Begins Here! ✈️🌍"}
//                 </Header>
//               </div>
//             </div>
//           </Grid.Column>
//           <Grid.Column width={8} mobile={16} computer={8}>
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "center",
//                 flexDirection: "column",
//                 alignItems: "center",
//                 gap: "15px",
//                 marginBottom: "20px",
//               }}
//             >
//               <div style={{ gap: "30px !important" }}>
//                 <Button
//                   style={{
//                     background: theme.colors.black,
//                     color: theme.colors.white,
//                     gap: "20px",
//                   }}
//                 >
//                   Follow
//                 </Button>
//                 <a href="/chat">
//                   <Button
//                     style={{
//                       background: theme.colors.black,
//                       color: theme.colors.white,
//                     }}
//                   >
//                     Message
//                   </Button>
//                 </a>
//               </div>
//               <div
//                 style={{ display: "flex", gap: "30px", textAlign: "center" }}
//               >
//                 <div>
//                   <Header style={{ margin: "0", color: theme.colors.black }}>
//                     100
//                   </Header>
//                   <Header style={{ margin: "0", color: theme.colors.black }}>
//                     Follower
//                   </Header>
//                 </div>
//                 <div>
//                   <Header style={{ margin: "0", color: theme.colors.black }}>
//                     100
//                   </Header>
//                   <Header style={{ margin: "0", color: theme.colors.black }}>
//                     Following
//                   </Header>
//                 </div>
//               </div>
//             </div>
//           </Grid.Column>
//         </Grid.Row>
//       </Grid>
//       <TabExampleSecondaryPointing panes={panes} />
//     </>
//   );
// };

// export default ProfileContainer;
