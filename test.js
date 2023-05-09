var name = "小明";
var obj = {
  x: {
    name: "小虎",
    myname: function () {
      console.log(this.name);
      setTimeout(function () {
        console.log(this.name);
      }, 500);
    },
  },
  y: "2",
  name: "小王",
};

var a = obj.x.myname();
a;
