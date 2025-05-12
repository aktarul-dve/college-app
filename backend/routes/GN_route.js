import exoress from 'express'

import { CreatAlbume, 
      CreateAboutUs,
      CreatNews,
      CreatPancipal,
      CreatSlider,
      CreatStudents,
      CreatTeacher,
      deleteAboutUs,
      DeleteAlbume,
      deleteBlog, 
      deleteMainNotice,
      DeleteNews, 
      DeletePancipal,
      DeleteSlider,
      DeleteTeacher,
      GanarelNotices,
      GetAboutUs,
      GetAlbume,
      GetAllMainNotice,
      GetGnNotice,
      GetNews, 
      GetPancipal,
      getSinglenotice, 
      GetSlider, 
      getStudents, 
      GetTeacher, 
      mainNotice, 
      updatBlog,
      updateAboutUs,
      UpdateAlbume,
      UpdateNews,
      UpdatePancipal,
      UpdateSlider,
      UpdateTeacher,
      updatMainNotice } from '../controller/GN_controller.js';



const router = exoress.Router()

router.post("/ganarelN",GanarelNotices)
router.get("/getGnNotice",GetGnNotice)
router.put("/update/:id",updatBlog);
router.delete("/delete/:id",deleteBlog);

router.post("/mainNotice",mainNotice)
router.get("/getAllMainNotice",GetAllMainNotice)
router.get("/single-notice/:id",getSinglenotice);
router.put("/maniNoticeupdate/:id",updatMainNotice);
router.delete("/maniNoticedelete/:id",deleteMainNotice);

router.post("/creatAboutUs",CreateAboutUs)
router.get("/getAboutUs",GetAboutUs)
router.put("/updateAboutUs/:id",updateAboutUs);
router.delete("/deleteAboutUs/:id",deleteAboutUs);

router.post("/creatPancipal",CreatPancipal)
router.get("/getPancipal",GetPancipal)
router.put("/updatePancipal/:id",UpdatePancipal);
router.delete("/deletePancipal/:id",DeletePancipal);


router.post("/creatAlbume",CreatAlbume)
router.get("/getAlbume",GetAlbume)
router.put("/updateAlbume/:id",UpdateAlbume);
router.delete("/deleteAlbume/:id",DeleteAlbume);


router.post("/creatNews",CreatNews)
router.get("/getNews",GetNews)
router.put("/updateNews/:id",UpdateNews);
router.delete("/deleteNews/:id",DeleteNews);


router.post("/creatTeacher",CreatTeacher)
router.get("/getTeacher",GetTeacher)
router.put("/updateTeacher/:id",UpdateTeacher);
router.delete("/deleteTeacher/:id",DeleteTeacher);

router.post("/creatStudent",CreatStudents)
router.post("/getStudent",getStudents)



router.post("/creatSlider",CreatSlider)
router.get("/getSlider",GetSlider)
router.put("/updateSlider/:id",UpdateSlider);
router.delete("/deleteSlider/:id",DeleteSlider);





export default router;