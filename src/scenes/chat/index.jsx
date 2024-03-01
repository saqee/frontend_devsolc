import { Box } from "@mui/material"
import Header from "../../components/Header"
import "./chat.css"
const Chat = () => {
  return (
    <Box m="20px">
      <Header title="Chat Box" subtitle="We Are here for you 24/7." />
      <>
        <div>
          <div className="mx-auto shadow-lg rounded-lg">
            <div className="px-5 py-5 flex justify-between items-center ">
              <div className="font-semibold text-2xl">GoingChat</div>

              <div className="h-12 w-12 p-2 bg-yellow-500 rounded-full text-white font-semibold flex items-center justify-center">
                RA
              </div>
            </div>

            <div className="flex flex-row justify-between bg-black">
              <div className="w-full px-5 flex flex-col justify-between">
                <div className="flex flex-col mt-5">
                  <div className="flex justify-end mb-4">
                    <div className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
                      Hello !
                    </div>
                    <img
                      src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                      className="object-cover h-8 w-8 rounded-full"
                      alt=""
                    />
                  </div>
                  <div className="flex justify-start mb-4">
                    <img
                      src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                      className="object-cover h-8 w-8 rounded-full"
                      alt=""
                    />
                    <div className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-black">
                      Hello Sir, How may I help you?
                    </div>
                  </div>
                  <div className="flex justify-end mb-4">
                    <div>
                      <div className="mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
                        I would like to know if I can check my website for dark
                        pattern detection and certification from you?
                      </div>

                      <div className="mt-4 mr-2 py-3 px-4 bg-blue-400 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white">
                        Of course. We can help you to check your website and if
                        everything is okay then we will provide you the
                        certification.
                      </div>
                    </div>
                    <img
                      src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                      className="object-cover h-8 w-8 rounded-full"
                      alt=""
                    />
                  </div>
                  <div className="flex justify-start mb-4">
                    <img
                      src="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                      className="object-cover h-8 w-8 rounded-full"
                      alt=""
                    />
                    <div className="ml-2 py-3 px-4 bg-gray-400 rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-black">
                      Thanks. I would very much like that!
                    </div>
                  </div>
                </div>
                <div className="py-5">
                  <input
                    className="w-full bg-grey-300 py-5 px-3 rounded-xl"
                    type="text"
                    placeholder="type your message here..."
                    style={{ color: "bg-grey-300" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </Box>
  )
}

export default Chat
