var MessageState=function(){function t(t,a){$(t).text(a),$(t).css({color:"#f22"}),e&&clearInterval(e),e=setInterval(function(){$(t).text("")},3e3)}var e;return{Show:function(e,a){t(e,a)}}}(),ValidateState=ValidateState||function(){function t(){l="";for(var t=6,e=new Array(1,2,3,4,5,6,7,8,9,"a","b","c","d","e","f","g","h","i","j","k","m","n","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","J","K","M","N","P","Q","R","S","T","U","V","W","X","Y","Z"),a=e.length,s=0;s<t;s++){var n=Math.floor(Math.random()*a);l+=e[n]}return l}function e(t){var e={status:!0,msg:""};return e=t.length<=0?{status:!1,msg:"请输入验证码！"}:t.toUpperCase()!=l.toUpperCase()?{status:!1,msg:"验证码输入有误！"}:{status:!0,msg:""}}function a(t,e){return t.length>=e}function s(t){var e=/[\w\u4E00-\u9FA5\uF900-\uFA2D]{3,20}/,a=e.test(t);return{status:a,msg:a?"":"用户名格式不正确，只能由3-20个中文、大小写字母或下划线组成！"}}function n(t){var e=/[\w\S]{6,20}/,a=e.test(t);return{status:a,msg:a?"":"密码不能包含空格，长度不少6，不超过20"}}function r(t,e){for(var a=0,s=t.length;a<s;a++)if(t[a].key===e)return a;return-1}function i(t,e,a){var s=r(o,t);s==-1?o.push({key:t,bvalue:e,message:a}):(o[s].bvalue=e,o[s].message=a)}function u(){for(var t=0,e="",a=0,s=o.length;a<s;a++)o[a].bvalue?t++:e+=o[a].message+"\n";return t==o.length?{status:!0,msg:""}:{status:!1,msg:e}}var l,o=[];return{createCode:function(){return t()},validateCode:function(t){return e(t)},checkuser:function(t){return s(t)},checkpassword:function(t){return n(t)},chechlength:function(t,e){return a(t,e)},pushValidateItem:function(t,e,a){i(t,e,a)},validateAll:function(){return u()}}}(),validForm=function(){return{init:function(){var t=ValidateState.createCode();$("label.vcode").text(t),ValidateState.pushValidateItem("username",!1,"用户名格式不正确"),ValidateState.pushValidateItem("password",!1,"密码不能包含空格，长度不少6，不超过20"),ValidateState.pushValidateItem("vcode",!1,"验证码输入错误")},checkAll:function(){var t=ValidateState.checkuser($('input[name="username"]').val().trim());ValidateState.pushValidateItem("username",t.status,t.msg),t=ValidateState.checkpassword($('input[name="password"]').val()),ValidateState.pushValidateItem("password",t.status,t.msg),t=ValidateState.validateCode($('input[name="vcode"]').val()),ValidateState.pushValidateItem("vcode",t.status,t.msg)}}}();$(document).ready(function(){validForm.init(),$(".bg").height($(window).height()),$(window).resize(function(){$(".bg").height($(window).height())}),$("#form1").bind("submit",function(t){t.preventDefault(),validForm.checkAll();var e=ValidateState.validateAll();return e.status?($("#btnsumbit").val("正在登录..."),$("#btnsumbit").attr("disabled","disabled"),$.ajax({url:"ajaxLogin.ashx?type=login",method:"POST",data:$(this).serialize(),success:function(t){"success"==t.status?window.location.href="/":(MessageState.Show("#lblmsg",t.message),alert(t.message),$("#btnsumbit").val("登录"),$("#btnsumbit").removeAttr("disabled"))},error:function(t){alert(t.responseText),MessageState.Show("#lblmsg",t.responseText),$("#btnsumbit").val("登录"),$("#btnsumbit").removeAttr("disabled")}}),!1):(MessageState.Show("#lblmsg",e.msg),!1)}),$("#username").focus(),$("label.vcode").click(function(){var t=ValidateState.createCode();$("label.vcode").text(t)}),$('input[name="username"]').change(function(){var t=ValidateState.checkuser($(this).val().trim());t.status||MessageState.Show("#lblmsg",t.msg)}),$('input[name="password"]').change(function(){var t=ValidateState.checkpassword($(this).val());t.status||MessageState.Show("#lblmsg",t.msg)}),$('input[name="vcode"]').change(function(){var t=ValidateState.validateCode($(this).val());t.status||MessageState.Show("#lblmsg",t.msg)})});