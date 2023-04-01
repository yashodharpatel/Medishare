import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Amazon from "../assets/amazon.png";
import Spotify from "../assets/spotify.png";
import Zomato from "../assets/Zomato.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Rewards = () => {
  const [points, setPoints] = useState(null);
  const url = "http://localhost:5000";
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(url + `/getRewardPoints`, {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        });
        setPoints(res.data.points);
      } catch (err) {
        alert("Error");
        console.log(err);
      }
    }
    fetchData();
  }, []);

  async function dec(e, pts) {
    try {
      const res = await axios.post(
        url + `/claimreward`,
        { points: pts },
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      console.log(res.data);
    } catch (err) {
      alert("Error");
      console.log(err);
    }
  }

  return (
    <div>
      <Navbar />
      {points && (
        <div>
          <div className="font-bold text-4xl text-center py-12">
            Your Rewards {points}
          </div>
          <div
            className="grid md:grid-cols-3 sm:grid-cols-1 2xl:grid-cols-4 justify-evenly px-8 mb-16 space-x-12"
            onClick={(e) => dec(e, 50)}
          >
            <div className="bg-primary-gray rounded-lg overflow-hidden shadow-lg">
              <img src={Amazon} alt="Company Logo" className="h-48 w-full" />
              <div className="p-8">
                <div className="p-2 space-y-2">
                  <div className="font-semibold text-2xl">
                    Rs.200 Amazon Gift Voucher
                  </div>
                  <div className="font-medium text-lg">50 points</div>
                </div>
                <button className="btn-primary">Claim Now</button>
              </div>
            </div>

            <div
              className="bg-primary-gray rounded-lg overflow-hidden shadow-lg"
              onClick={(e) => dec(e, 20)}
            >
              <img src={Spotify} alt="Company Logo" className="h-48" />
              <div className="p-8">
                <div className="p-2 space-y-2">
                  <div className="font-semibold text-2xl">
                    Rs.150 Spotify Premium Subscription
                  </div>
                  <div className="font-medium text-lg">20 points</div>
                </div>
                <button className="btn-primary">Claim Now</button>
              </div>
            </div>

            <div
              className="bg-primary-gray rounded-lg overflow-hidden shadow-lg"
              onClick={(e) => dec(e, 100)}
            >
              <img src={Zomato} alt="Company Logo" className="h-48" />
              <div className="p-8">
                <div className="p-2 space-y-2">
                  <div className="font-semibold text-2xl">
                    Rs.400 on your First Zomato Order
                  </div>
                  <div className="font-medium text-lg">100 points</div>
                </div>
                <button className="btn-primary">Claim Now</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rewards;
