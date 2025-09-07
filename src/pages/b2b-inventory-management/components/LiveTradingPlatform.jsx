import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../components/ui/AuthenticationRouter';
import Button from '../../../components/ui/Button';

const LiveTradingPlatform = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeOffers, setActiveOffers] = useState([]);
  const [marketData, setMarketData] = useState({});
  const [auctionItems, setAuctionItems] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Initialize real-time trading data
    initializeTradingData();
    
    // Simulate real-time updates
    const interval = setInterval(() => {
      updateMarketPrices();
      checkTradeNotifications();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const initializeTradingData = () => {
    setActiveOffers([
      {
        id: 1,
        productName: 'Tesla Powerwall 2',
        seller: 'Tesla Energy',
        quantity: 50,
        unitPrice: 11500,
        totalValue: 575000,
        bidPrice: 11200,
        timeRemaining: '2h 15m',
        status: 'active',
        bids: 12,
        trend: 'up'
      },
      {
        id: 2,
        productName: 'LG Solar Panel 400W',
        seller: 'LG Energy',
        quantity: 200,
        unitPrice: 280,
        totalValue: 56000,
        bidPrice: 275,
        timeRemaining: '4h 32m',
        status: 'active',
        bids: 8,
        trend: 'down'
      },
      {
        id: 3,
        productName: 'SolarEdge Inverter SE7600',
        seller: 'SolarEdge Tech',
        quantity: 25,
        unitPrice: 1600,
        totalValue: 40000,
        bidPrice: 1580,
        timeRemaining: '6h 45m',
        status: 'active',
        bids: 15,
        trend: 'stable'
      }
    ]);

    setMarketData({
      solarPanels: { price: 285, change: +2.5, volume: '1.2M' },
      batteries: { price: 11800, change: -1.2, volume: '850K' },
      inverters: { price: 1620, change: +0.8, volume: '650K' },
      systems: { price: 25500, change: +3.2, volume: '320K' }
    });

    setAuctionItems([
      {
        id: 1,
        title: 'Bulk Solar Panel Auction - 1000 Units',
        currentBid: 250000,
        minimumBid: 280000,
        timeLeft: '1d 12h',
        bidders: 23,
        category: 'Solar Panels'
      },
      {
        id: 2,
        title: 'Commercial Battery Storage - 500kWh',
        currentBid: 120000,
        minimumBid: 150000,
        timeLeft: '18h 30m',
        bidders: 8,
        category: 'Energy Storage'
      }
    ]);
  };

  const updateMarketPrices = () => {
    setMarketData(prev => {
      const updated = { ...prev };
      Object.keys(updated).forEach(key => {
        const change = (Math.random() - 0.5) * 5; // Random price change
        updated[key] = {
          ...updated[key],
          change: parseFloat(change.toFixed(2))
        };
      });
      return updated;
    });
  };

  const checkTradeNotifications = () => {
    const newNotifications = [
      'New bid received on Tesla Powerwall offer',
      'Market price alert: Solar panels up 2.5%',
      'Auction ending soon: Commercial Battery Storage'
    ];
    
    setNotifications(prev => {
      const latest = newNotifications[Math.floor(Math.random() * newNotifications.length)];
      return [{ id: Date.now(), message: latest, time: new Date() }, ...prev.slice(0, 4)];
    });
  };

  const handlePlaceBid = (offerId, bidAmount) => {
    setActiveOffers(prev => 
      prev.map(offer => 
        offer.id === offerId 
          ? { ...offer, bidPrice: bidAmount, bids: offer.bids + 1 }
          : offer
      )
    );
  };

  const handleCreateOffer = () => {
    navigate('/create-trade-offer');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Live Energy Trading Platform</h1>
          <p className="text-gray-600">Real-time energy product trading and auctions</p>
        </div>

        {/* Market Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {Object.entries(marketData).map(([key, data]) => (
            <div key={key} className="bg-white rounded-lg p-4 shadow-sm border">
              <div className="text-sm text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
              <div className="text-2xl font-bold">${data.price?.toLocaleString()}</div>
              <div className={`text-sm ${data.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {data.change >= 0 ? '+' : ''}{data.change}% • Vol: {data.volume}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Active Trading Offers */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">Active Trading Offers</h2>
                  <Button onClick={handleCreateOffer}>Create Offer</Button>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {activeOffers.map(offer => (
                    <div key={offer.id} className="border rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{offer.productName}</h3>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          offer.trend === 'up' ? 'bg-green-100 text-green-700' :
                          offer.trend === 'down' ? 'bg-red-100 text-red-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {offer.trend.toUpperCase()}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="text-gray-600">Quantity</div>
                          <div className="font-medium">{offer.quantity} units</div>
                        </div>
                        <div>
                          <div className="text-gray-600">Current Bid</div>
                          <div className="font-medium">${offer.bidPrice.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-gray-600">Total Value</div>
                          <div className="font-medium">${offer.totalValue.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-gray-600">Time Left</div>
                          <div className="font-medium">{offer.timeRemaining}</div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-sm text-gray-600">{offer.bids} bids</span>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">Watch</Button>
                          <Button size="sm">Place Bid</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Live Auctions */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-4 border-b">
                <h3 className="font-bold">Live Auctions</h3>
              </div>
              <div className="p-4 space-y-4">
                {auctionItems.map(auction => (
                  <div key={auction.id} className="border rounded-lg p-3">
                    <h4 className="font-medium text-sm mb-2">{auction.title}</h4>
                    <div className="text-xs text-gray-600 space-y-1">
                      <div>Current: ${auction.currentBid.toLocaleString()}</div>
                      <div>Min Bid: ${auction.minimumBid.toLocaleString()}</div>
                      <div>Time: {auction.timeLeft}</div>
                      <div>{auction.bidders} bidders</div>
                    </div>
                    <Button size="sm" className="w-full mt-2">Join Auction</Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-white rounded-lg shadow-sm border">
              <div className="p-4 border-b">
                <h3 className="font-bold">Live Notifications</h3>
              </div>
              <div className="p-4">
                <div className="space-y-3">
                  {notifications.map(notification => (
                    <div key={notification.id} className="text-sm p-2 bg-blue-50 rounded border-l-4 border-blue-400">
                      <div>{notification.message}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {notification.time?.toLocaleTimeString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveTradingPlatform;
