import News from "../model/news.model";

// export const addNews = async(req,res) => {
//     try {
//         const {content} = req.body ;

//         const newsObj = new News({content:content});
//         const addedNews = await newsObj.save() ;

//         return res.status(200).json({
//             success:true,
//             message:"Added News",
//             addedNews:addedNews
//         })
//     } 
//     catch (error) {
//         return res.status(500).json({
//             success:false,
//             message:"Something error in addNews controller backend.",
//             error:error.message,
//         })
//     }
// }