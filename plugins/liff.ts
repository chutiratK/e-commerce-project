import liff from "@line/liff";
import { auth } from "@/plugins/firebase";

liff
  .init({ liffId: "2003517508-8gKpw6JQ" })
  .then(() => {
    auth.onAuthStateChanged(async () => {
      if (liff.isLoggedIn()) {
        await liff.getProfile();
        console.log("ผู้ใช้เข้าสู่ระบบด้วย line:");
      } else {
        console.log("ผู้ใช้ออกจากระบบ line");
      }
    });
  })
  .catch((error) => {
    console.error("Error initializing LIFF: ", error);
  });
