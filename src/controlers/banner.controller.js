

export const addBanner = async(req,res) => {
    try {
        const formdata = await req.formData();
        const response = await fetch("http://localhost:3000/api/upload",{method: 'POST', body: formdata });
        const res = await response.json();

        console.log(res);

        const src = res.cloudRes.url;
        console.log(src);

        if(src)
        {
            let links = await Banner.findOne({});

            
            if(!links)
            {
                const firstLink = Banner({links:src});
                await firstLink.save();
                return NextResponse.json({success:true,message:"This is added Link", updatedLinks:firstLink}) ;
            }


            links = await Banner.findOneAndUpdate(
                {},
                {$push : {links:src}},
                {new:true}
            )

            return NextResponse.json({success:true,message:"This is added Link", updatedLinks:links}) ;
        }
        return NextResponse.json({success:false,message:"Some error in addBanner"}) ;
            
    } catch (error) {
        
    }
}