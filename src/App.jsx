import { useState } from "react";
import axios from "axios"
import "./App.css";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";

function App() {
  const [originOptions, setOriginOptions] = useState("hidden");
  const [cabinOptions, setcabinOptions] = useState("hidden");
  const [originValue, setOriginValue] = useState("SYD");
  const [destinationValue, setDestinationValue] = useState("SYD");
  const [toggle,settoggle]=useState(0)
  const [s, ss] = useState("SYD");
  const [destinationOptions, setDestinationOptions] = useState("hidden");
  
  const [d, dd] = useState("JFK");
  const [l, ll] = useState("Economy");
  const [ticketData,setTicketData]=useState([])
  const orginAirport = ["JFK", "DEL", "SYD", "BOM", "BNE", "BLR"];
  const destinationAirport = ["JFK", "DEL", "SYD", "LHR", "CDG", "DOH", "SIN"];
  const cabin = ["economy", "business", "first"];
  
  function handleorginchange(e) {
    let l = e.target.value;
    ss(l);
  }
  function handledestinationchange(e) {
    let l = e.target.value;
    dd(l);
  }
  function handlecabin(e) {
    let m = e.target.value;
    ll(m);
  }
  const filteredAirports = orginAirport.filter((port) =>
    port.includes(s.toUpperCase())
  );
  const filteredDestinationAirports = destinationAirport.filter((port) =>
    port.includes(d.toUpperCase())
  );
  const filteredcabin = cabin.filter((cab) => cab.includes(l.toLowerCase()));
  async function handleSubmit(){
    let ori=orginAirport.filter((x)=>{return x==s})
    let dest=destinationAirport.filter((x)=>{return x==d})
    let cab=cabin.filter((x)=>{return x==l.toLowerCase()})
    
    if (ori.length==0 || dest.length==0 || cab.length==0){
      alert("fill correctly");
    } 
    try {
      setDestinationValue(dest[0])
      setOriginValue(ori[0])
      const response = await axios.post(
        'https://cardgpt.in/apitest',
        {
          origin: ori[0],
          destination: dest[0],
          partnerPrograms: [
            'Air Canada',
            'United Airlines',
            'KLM',
            'Qantas',
            'American Airlines',
            'Etihad Airways',
            'Alaska Airlines',
            'Qatar Airways',
            'LifeMiles'
          ],
          stops: 2,
          departureTimeFrom: '2024-07-16T07:41:57.606Z',
          departureTimeTo: '2024-08-16T07:42:56.816Z',
          isOldData: false,
          limit: 302,
          offset: 0,
          cabinSelection: [cab[0].toUpperCase()+cab.slice(1,cab.length)],
          date: '2024-07-09T12:00:17.796Z'
        },
        {
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Accept-Language': 'en-US,en;q=0.9,hi;q=0.8',
            'Cache-Control': 'no-cache',
            'Content-Type': 'application/json',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'
          }
        }
      );
      let res=response.data.data
      setTicketData(res)
      

    } catch (error) {
      console.error('Error fetching data', error);
    }
  
  }

  return (
    <>
      <div className="h-[100vh] w-[100vw] bg-[#142314]">
        <div className="grid grid-cols-12">
          <div className="col-span-1 sm:col-span-3  xl:col-span-4"></div>
          <div className="col-span-10 sm:col-span-6  xl:col-span-4 ">
            <h4 className="text-[#9ea29e] font-semibold md:text-lg text-xl ">
              Choose Origin & Destination Airports:
            </h4>
            <br />
            {/* first input */}
            <div
              className="bg-[#181818] ml-2 mb-8 h-16 w-64 hover:bg-[#1c2519]"
              onClick={() => {
                originOptions == "hidden"
                  ? setOriginOptions("block")
                  : setOriginOptions("hidden");
              }}
            >
              <div className="grid grid-cols-5">
                <div className="col-span-4">
                  <p className="text-[#7c7c7c] mt-3 ml-3 font-light text-md ">
                    Origin
                  </p>
                  <div className="dropdown ">
                    <input
                      type="text"
                      id="search"
                      className="ml-3 bg-[#181818] hover:bg-[#1c2519] text-[#7c7c7c] font-medium text-md "
                      value={s}
                      onChange={(e) => {
                        handleorginchange(e);
                      }}
                      onClick={() => {
                        ss("");
                      }}
                    />
                    <div
                      id="dropdown-content"
                      className={`bg-[#181818]  py-1  ${originOptions} text-white`}
                    >
                      {s == ""
                        ? orginAirport.map((port) => {
                            return (
                              <div key={port}>
                                <div
                                  data-value={port}
                                  key={port}
                                  className="m-3 text-[#7c7c7c] hover:bg-[#1c2519]"
                                  onClick={() => ss(port)}
                                >
                                  {port}
                                </div>
                              </div>
                            );
                          })
                        : filteredAirports.map((port) => {
                            return (
                              <div key={port}>
                                <div
                                  data-value={port}
                                  className="m-3 text-[#7c7c7c] hover:bg-[#1c2519] cursor-pointer"
                                  onClick={() => ss(port)}
                                >
                                  {port}
                                </div>
                              </div>
                            );
                          })}
                    </div>
                  </div>
                </div>
                <div className="col-span-1 relative">
                  {originOptions == "hidden" ? (
                    <IoMdArrowDropdown
                      fill="#7c7c7c"
                      className="absolute top-6 right-3"
                      size={20}
                    />
                  ) : (
                    <IoMdArrowDropup
                      fill="#7c7c7c"
                      className="absolute top-6 right-3"
                      size={20}
                    />
                  )}
                </div>
              </div>
            </div>
            {/* second input */}
            <div
              className="bg-[#181818] ml-2 mb-8 h-16 w-64 hover:bg-[#1c2519]"
              onClick={() => {
                destinationOptions == "hidden"
                  ? setDestinationOptions("block")
                  : setDestinationOptions("hidden");
              }}
            >
              <div className="grid grid-cols-5">
                <div className="col-span-4">
                  <p
                    className={`text-[#7c7c7c] mt-3 ml-3 font-light text-md ${
                      originOptions == "hidden" ? "" : "hidden"
                    }`}
                  >
                    Destination
                  </p>
                  <div
                    className={`dropdown ${
                      originOptions == "hidden" ? "" : "hidden"
                    }`}
                  >
                    <input
                      type="text"
                      id="search"
                      className="ml-3 bg-[#181818] hover:bg-[#1c2519] text-[#7c7c7c] font-medium text-md "
                      value={d}
                      onChange={(e) => {
                        handledestinationchange(e);
                      }}
                      onClick={() => {
                        dd("");
                      }}
                    />
                    <div
                      id="dropdown-content"
                      className={`bg-[#181818]  py-1  ${destinationOptions} text-white`}
                    >
                      {d == ""
                        ? destinationAirport.map((port) => {
                            return (
                              <div key={port}>
                                <div
                                  data-value={port}
                                  key={port}
                                  className="m-3 text-[#7c7c7c] hover:bg-[#1c2519]"
                                  onClick={() => dd(port)}
                                >
                                  {port}
                                </div>
                              </div>
                            );
                          })
                        : filteredDestinationAirports.map((port) => {
                            return (
                              <div key={port}>
                                <div
                                  data-value={port}
                                  className="m-3 text-[#7c7c7c] hover:bg-[#1c2519] cursor-pointer"
                                  onClick={() => dd(port)}
                                >
                                  {port}
                                </div>
                              </div>
                            );
                          })}
                    </div>
                  </div>
                </div>
                <div className="col-span-1 relative">
                  {destinationOptions == "hidden" ? (
                    <IoMdArrowDropdown
                      fill="#7c7c7c"
                      className="absolute top-6 right-3"
                      size={20}
                    />
                  ) : (
                    <IoMdArrowDropup
                      fill="#7c7c7c"
                      className="absolute top-6 right-3"
                      size={20}
                    />
                  )}
                </div>
              </div>
            </div>
            {/* third input */}
            <div
              className="bg-[#181818] ml-2 mb-8 h-16 w-64 hover:bg-[#1c2519]"
              onClick={() => {
                cabinOptions == "hidden"
                  ? setcabinOptions("block")
                  : setcabinOptions("hidden");
              }}
            >
              <div className="grid grid-cols-5">
                <div className="col-span-4">
                  <p
                    className={`text-[#7c7c7c] mt-3 ml-3 font-light text-md ${
                      originOptions == "hidden" ? "" : "hidden"
                    } ${destinationOptions == "hidden" ? "" : "hidden"}`}
                  >
                    Cabin Selection
                  </p>
                  <div
                    className={`dropdown ${
                      originOptions == "hidden" ? "" : "hidden"
                    } ${destinationOptions == "hidden" ? "" : "hidden"}`}
                  >
                    <input
                      type="text"
                      id="search"
                      className="ml-3 bg-[#181818] hover:bg-[#1c2519] text-[#7c7c7c] font-medium text-md "
                      value={l}
                      onChange={(e) => {
                        handlecabin(e);
                      }}
                      onClick={() => {
                        ll("");
                      }}
                    />
                    <div
                      id="dropdown-content"
                      className={`bg-[#181818]  py-1  ${cabinOptions} text-white`}
                    >
                      {l == ""
                        ? cabin.map((port) => {
                            return (
                              <div key={port}>
                                <div
                                  data-value={port}
                                  key={port}
                                  className="m-3 text-[#7c7c7c] hover:bg-[#1c2519]"
                                  onClick={() => ll(port)}
                                >
                                  {port[0].toUpperCase() +
                                    port.slice(1, port.length)}
                                </div>
                              </div>
                            );
                          })
                        : filteredcabin.map((port) => {
                            return (
                              <div key={port}>
                                <div
                                  data-value={port}
                                  className="m-3 text-[#7c7c7c] hover:bg-[#1c2519] cursor-pointer"
                                  onClick={() =>
                                    ll(
                                      port[0].toUpperCase() +
                                        port.slice(1, port.length)
                                    )
                                  }
                                >
                                  {port[0].toUpperCase() +
                                    port.slice(1, port.length)}
                                </div>
                              </div>
                            );
                          })}
                    </div>
                  </div>
                </div>
                <div className="col-span-1 relative">
                  {cabinOptions == "hidden" ? (
                    <IoMdArrowDropdown
                      fill="#7c7c7c"
                      className="absolute top-6 right-3"
                      size={20}
                    />
                  ) : (
                    <IoMdArrowDropup
                      fill="#7c7c7c"
                      className="absolute top-6 right-3"
                      size={20}
                    />
                  )}
                </div>
              </div>
            </div>
            {/* sections */}
            <div className="bg-[#181818] ml-2 mb-8 h-16 w-64 hover:bg-[#1c2519]">
            <div className={`flex py-5 ${cabinOptions == "hidden" ? "" : "hidden"} ${destinationOptions == "hidden" ? "" : "hidden"}`}>
              <div className="mx-5">  
                  <button className={`bg-slate-300 ${toggle?"bg-slate-600":"bg-orange-700"} my-1 h-4 w-8 rounded-lg relative`}  onClick={()=>{toggle?settoggle(0):settoggle(1)}}>
                    <div className={` h-4 w-4 absolute top-0 rounded-full ${toggle?"right-0 bg-slate-800":"left-0 bg-slate-300"}`}></div>
                  </button>
              </div>
              <p className={`${toggle?"text-[#5e5e5e]":"text-[#e8e4e4]"}`}>Show <span className={`${toggle?"text-[#834218]":"text-orange-500"}`}>Pro Filters</span></p>
            </div>
            </div>
            
            <button className="bg-[#38b8a6] mb-10 text-white py-2 px-6 rounded-md" onClick={handleSubmit}>Search</button>
            
            <div className="grid grid-cols-11">
            <div className="col-span-1 "></div>
            <div className="col-span-10">
              <div className="grid md:grid-cols-2 gap-4">
                
                  {ticketData.length?
                  ticketData.map((dataa,index)=>{
                    return <div key={index}>
                      <div className="bg-[#346c4a] col-span-1 h-[350px] rounded-lg">
                    <div className="grid text-white justify-center">
                      <img src="" alt="Logo" className="px-16 pt-6"></img>
                      <h3 className="text-2xl my-1 font-normal text-center">{dataa.partner_program }</h3>
                      <p className="text-center my-1">{originValue +" -> "+ destinationValue } </p>
                      <p className="text-center my-1">2024-07-09 - 2024-10-07</p> 
                      {dataa.min_business_miles==null?
                      <h1 className="text-2xl text-center">N/A</h1>:
                      <div className="flex"><h1 className="text-2xl ml-10">{dataa.min_business_miles}</h1>
                      {dataa.min_business_tax==null?"":
                      <p className="pt-1"> +${dataa.min_business_tax}</p>
                      }
                      </div>
                      
                      
                      }
                      <p className="text-center my-1" >Min Business Miles</p>
                      {dataa.min_economy_miles==null?
                      <h1 className="text-2xl text-center">N/A</h1>:
                      <div className="flex"><h1 className={`text-2xl ml-10 ${dataa.min_economy_taxs==null?"mx-12":""} `}>{dataa.min_economy_miles}</h1>
                      {dataa.min_economy_taxs==null?"":
                      <p className="pt-1"> +${dataa.min_economy_taxs}</p>
                      }
                      </div>
                      
                      
                      }
                      
                      
                      <p className="text-center my-1" >Min Economy Miles</p>
                      {dataa.min_first_miles==null?
                      <h1 className="text-2xl text-center">N/A</h1>:
                      <div className="flex"><h1 className="text-2xl ml-10">{dataa.min_first_miles}</h1>
                      {dataa.min_first_taxs==null?"":
                      <p className="pt-1"> +${dataa.min_first_taxs}</p>
                      }
                      </div>
                      
                      
                      }
                      
                      <p className="text-center">Min first Miles</p>
                    </div>
                  </div>
                    </div>
                  })
                  :""}
                
                <div className=" col-span-1"></div>
              </div>
            </div>
          
            
            </div>

          </div>

          <div className="col-span-1 sm:col-span-3  xl:col-span-4 ">
           
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
