exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("posts").insert([
    {
      user_id: 1,
      title: "Looking for someone to get my child!",
      meetingPlace: "Florida",
      time: "april 30, 2019",
      numOfKids: 3
    },
    {
      user_id: 1,
      title: "Looking for someone to get my child!",
      meetingPlace: "Florida",
      time: "april 30, 2019",
      numOfKids: 2
    },
    {
      user_id: 2,
      title: "Looking for someone to get my child!",
      meetingPlace: "Florida",
      time: "april 30, 2019",
      numOfKids: 1
    },
    {
      user_id: 2,
      title: "Looking for someone to get my child!",
      meetingPlace: "Florida",
      time: "april 30, 2019",
      numOfKids: 5
    },
    {
      user_id: 3,
      title: "Looking for someone to get my child!",
      meetingPlace: "Florida",
      time: "april 30, 2019",
      numOfKids: 26
    }
  ]);
};
