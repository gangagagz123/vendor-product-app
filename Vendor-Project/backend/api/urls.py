from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RegisterView, ProductViewSet
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/', obtain_auth_token),
]


# Router automatically creates CRUD URLs
router = DefaultRouter()
router.register('products', ProductViewSet)

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/', obtain_auth_token),

    # All product CRUD URLs will be generated here
    path('', include(router.urls)),
]
