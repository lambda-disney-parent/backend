exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("commentSection").insert([
    {
      post_id: 1,
      comment:
        "Turkey picanha tenderloin flank alcatra turducken tail. Jowl pig sirloin turkey ham hock salami ball tip. ",
      repliedBy: "Brandon"
    },
    {
      post_id: 1,
      comment:
        "Bacon ipsum dolor amet turkey bresaola landjaeger, pork hamburger chuck filet mignon. Rump pork burgdoggen,",
      repliedBy: "Brandon"
    },
    {
      post_id: 1,
      comment:
        "Turkey pork pork chop cupim shankle chuck ribeye short loin, ground round sausage corned beef.",
      repliedBy: "Brandon"
    },
    {
      post_id: 1,
      comment:
        "Pancetta sirloin biltong t-bone meatloaf pork chop, doner ribeye. Pastrami spare ribs meatloaf chicken",
      repliedBy: "Brandon"
    },
    {
      post_id: 1,
      comment:
        "Venison tongue corned beef landjaeger meatball pig ball tip drumstick pork loin capicola pork chop strip steak. ",
      repliedBy: "Brandon"
    }
  ]);
};
