/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
const admin = require('firebase-admin');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { setDateChat, getChatTime } = require('../utils/parseDate');

const getChats = catchAsync(async (req, res) => {
  const { ktpa } = req.body;
  const urlFirebase = `messages/${ktpa}`;
  try {
    const db = admin.database();
    const ref = db.ref(urlFirebase);
    ref.on(
      'value',
      function (snapshot) {
       
        res.json({ 
          responseCode: 200, 
          status: "success",
          data: snapshot.val()
        });
      },

      function (errorObject) {
        console.log(`The read failed: ${errorObject.code}`);
      }
    );
  } catch (error) {
    console.log(error.message);
    res.json({ 
      responseCode: 500, 
      status: "Error",
      data: error.message
    });
  }
});

const postChat = catchAsync(async (req, res) => {
  const { ktpa, userId, chatContent } = req.body;
  const today = new Date();
  try {
    const chatID = `${ktpa}_${userId}`;
    const urlFirebase = `chatting/${chatID}/allChat/${setDateChat(today)}`;
    const urlMessageLawyer = `messages/${ktpa}/${chatID}`;
    const urlMessageUser = `messages/${userId}/${chatID}`;

    const data = {
      sendBy: ktpa,
      chatDate: today.getTime(),
      chatTime: getChatTime(today),
      chatContent,
    };

    const dataHistoryChatForUser = {
      lastContentChat: chatContent,
      lastChatDate: today.getTime(),
      uidPartner: ktpa,
    };
    const dataHistoryChatForLawyer = {
      lastContentChat: chatContent,
      lastChatDate: today.getTime(),
      uidPartner: userId,
    };

    admin.database().ref(urlFirebase)
    .push(data)
    .then(() => { 
      admin.database().ref(urlMessageLawyer).set(dataHistoryChatForLawyer)
      admin.database().ref(urlMessageUser).set(dataHistoryChatForUser)
    }).catch((err) => {
      console.log(err)
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, err.message);
    })

    res.json({ 
      responseCode: 200, 
      status: "success",
    });

  } catch (error) {
    console.log(error.message);
    res.json({ 
      responseCode: 500, 
      status: error.message,
    });
  }

})

module.exports = {
  getChats,
  postChat
};
