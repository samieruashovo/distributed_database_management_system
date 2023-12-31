from django.urls import path
from .views import UsersList, UserDetailView, follow_unfollow, recommend_user, follow_user_list, update_profile
from .models import User
urlpatterns = [
    path('users/', UsersList.as_view()),
    # path('users/register/', ),

    path('recommend_users/forme/', recommend_user),
    path('recommend_users/userlist/', follow_user_list),
    path('user/me/follow_unfollow/', follow_unfollow),
    path('user/<str:username>/', UserDetailView.as_view()),
    path('user/update/<str:username>/', update_profile),
    path('user/<str:username>/<str:username2>/', UserDetailView.as_view())
]
