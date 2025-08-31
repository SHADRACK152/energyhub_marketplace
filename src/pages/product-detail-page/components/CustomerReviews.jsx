import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const CustomerReviews = ({ rating, reviewCount, productId }) => {
  const [sortBy, setSortBy] = useState('newest');
  const [filterRating, setFilterRating] = useState('all');

  // Mock reviews data
  const reviews = [
    {
      id: 1,
      user: {
        name: "Michael Chen",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50",
        verified: true
      },
      rating: 5,
      date: "2024-01-15",
      title: "Excellent performance and quality",
      content: "These solar panels exceeded my expectations. Installation was smooth and they\'re already showing great energy output. The build quality is top-notch and the efficiency ratings are accurate.",
      helpful: 12,
      images: ["https://images.unsplash.com/photo-1509391366360-2e959784a276?w=200"]
    },
    {
      id: 2,
      user: {
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50",
        verified: true
      },
      rating: 4,
      date: "2024-01-10",
      title: "Good value for money",
      content: "Solid performance and reasonable price. Setup took a bit longer than expected but the panels are working well. Customer service was responsive when I had questions.",
      helpful: 8,
      images: []
    },
    {
      id: 3,
      user: {
        name: "David Rodriguez",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50",
        verified: false
      },
      rating: 5,
      date: "2024-01-05",
      title: "Perfect for residential use",
      content: "Installed 12 of these panels and they\'ve been performing excellently. Great efficiency and the warranty gives peace of mind. Highly recommended for residential solar installations.",
      helpful: 15,
      images: []
    }
  ];

  const ratingDistribution = {
    5: 67,
    4: 23,
    3: 6,
    2: 3,
    1: 1
  };

  const renderStars = (rating, size = 16) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars?.push(<Icon key={i} name="Star" size={size} className="text-warning fill-current" />);
    }

    if (hasHalfStar) {
      stars?.push(<Icon key="half" name="StarHalf" size={size} className="text-warning fill-current" />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars?.push(<Icon key={`empty-${i}`} name="Star" size={size} className="text-muted-foreground" />);
    }

    return stars;
  };

  const handleHelpful = (reviewId) => {
    console.log('Marking review as helpful:', reviewId);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-foreground">Customer Reviews</h3>
        <Button variant="outline" size="sm" iconName="MessageSquarePlus" iconPosition="left">
          Write Review
        </Button>
      </div>
      {/* Rating Summary */}
      <div className="bg-muted/30 rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Overall Rating */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-2 mb-2">
              <span className="text-4xl font-bold text-foreground">{rating}</span>
              <div>
                <div className="flex items-center space-x-1">
                  {renderStars(rating, 20)}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Based on {reviewCount} reviews
                </p>
              </div>
            </div>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1]?.map((star) => (
              <div key={star} className="flex items-center space-x-3">
                <span className="text-sm w-8">{star}★</span>
                <div className="flex-1 bg-muted rounded-full h-2">
                  <div
                    className="bg-warning h-2 rounded-full"
                    style={{
                      width: `${(ratingDistribution?.[star] / reviewCount) * 100}%`
                    }}
                  />
                </div>
                <span className="text-sm text-muted-foreground w-8">
                  {ratingDistribution?.[star]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-muted-foreground">Sort:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e?.target?.value)}
            className="px-3 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="highest">Highest Rating</option>
            <option value="lowest">Lowest Rating</option>
            <option value="helpful">Most Helpful</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-muted-foreground">Filter:</label>
          <select
            value={filterRating}
            onChange={(e) => setFilterRating(e?.target?.value)}
            className="px-3 py-2 border border-input rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="all">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
        </div>
      </div>
      {/* Reviews List */}
      <div className="space-y-6">
        {reviews?.map((review) => (
          <div key={review?.id} className="border border-border rounded-lg p-6 space-y-4">
            {/* Review Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <Image
                  src={review?.user?.avatar}
                  alt={review?.user?.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-foreground">{review?.user?.name}</span>
                    {review?.user?.verified && (
                      <div className="flex items-center space-x-1 bg-success/10 px-2 py-1 rounded-full">
                        <Icon name="CheckCircle" size={12} className="text-success" />
                        <span className="text-xs text-success font-medium">Verified Purchase</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="flex items-center space-x-1">
                      {renderStars(review?.rating, 14)}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {new Date(review?.date)?.toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Review Content */}
            <div>
              <h4 className="font-medium text-foreground mb-2">{review?.title}</h4>
              <p className="text-muted-foreground leading-relaxed">{review?.content}</p>
            </div>

            {/* Review Images */}
            {review?.images?.length > 0 && (
              <div className="flex space-x-2">
                {review?.images?.map((image, index) => (
                  <Image
                    key={index}
                    src={image}
                    alt={`Review image ${index + 1}`}
                    className="w-16 h-16 rounded-md object-cover cursor-pointer hover:opacity-75 transition-opacity"
                  />
                ))}
              </div>
            )}

            {/* Review Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-border">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleHelpful(review?.id)}
                  className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Icon name="ThumbsUp" size={16} />
                  <span className="text-sm">Helpful ({review?.helpful})</span>
                </button>
                
                <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Reply
                </button>
              </div>

              <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Report
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Load More */}
      <div className="text-center">
        <Button variant="outline" size="lg">
          Load More Reviews
        </Button>
      </div>
    </div>
  );
};

export default CustomerReviews;