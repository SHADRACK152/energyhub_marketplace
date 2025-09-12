import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import { useTranslation } from '../../utils/i18n.jsx';

const ComingSoon = ({ title, description }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-4 text-primary-foreground hover:bg-primary-foreground/10"
          >
            <Icon name="ArrowLeft" size={16} className="mr-2" />
            {t('actions.back') || 'Back'}
          </Button>
          <h1 className="text-3xl font-bold">{title || t('comingSoon.title')}</h1>
          <p className="text-primary-foreground/80 mt-2">
            {description || t('comingSoon.description')}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="text-6xl mb-8">🚧</div>
          <h2 className="text-2xl font-semibold mb-4">{t('comingSoon.title') || 'Coming Soon'}</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">{t('comingSoon.description') || "We're working hard to bring you this feature. Stay tuned for updates!"}</p>
          
          <div className="flex justify-center space-x-4">
            <Button onClick={() => navigate('/landing-page')}>
              {t('comingSoon.goHome')}
            </Button>
            <Button variant="outline" onClick={() => navigate('/contact-us')}>
              {t('comingSoon.contactUs')}
            </Button>
          </div>

          <div className="mt-12 p-6 bg-muted rounded-lg">
            <h3 className="font-semibold mb-4">{t('comingSoon.inTheMeantime')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <Icon name="ShoppingCart" size={32} className="mx-auto mb-2 text-primary" />
                  <p className="text-sm">{t('footer.browseProducts')}</p>
                </div>
              <div className="text-center">
                <Icon name="User" size={32} className="mx-auto mb-2 text-primary" />
                  <p className="text-sm">{t('nav.profile')}</p>
              </div>
              <div className="text-center">
                <Icon name="MessageCircle" size={32} className="mx-auto mb-2 text-primary" />
                  <p className="text-sm">{t('footer.support')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
