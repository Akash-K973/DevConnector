const InfoCard = ({user}) =>{
   const {_id,firstName,lastName,photoURl,age,gender,about,skills} = user;
    return (
        <>
            <div className="userCard flex justify-center items-center card flex bg-base-300 w-96 shadow-sm ">
                <figure className="h-50 w-50">
                    <img className="outline outline-2 outline-violet-400 outline-offset-6 mt-5 rounded-full"
                    src={photoURl} 
                    alt="photo" />
                </figure>
                <br />
                <div className="card-body">
                    <h3 className="text-sm text-gray-400 mb-2">Name :</h3>
                    <h2 className="card-title">{firstName +" "+lastName}</h2>
                    <h3 className="text-sm text-gray-400 mb-2">Age & Gender</h3>
                        {age && gender && <p>{age + " " + gender}</p>}
                    <h3 className="text-sm text-gray-400 mb-2">About</h3>
                        <p>{about}</p>
                </div>
                <div className="mt-6">
          <h3 className="text-sm text-gray-400 mb-2">SKILLS</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="border border-gray-500 px-2 py-1 text-xs rounded"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
            </div>
        
        </>
    )
}

export default InfoCard; 