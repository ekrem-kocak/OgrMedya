using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using ServerApp.DTO;
using ServerApp.Models;

namespace ServerApp.Helpers
{
    public class MapperProfiles : Profile
    {
        public MapperProfiles()
        {
            CreateMap<User, UserForListDTO>()
                .ForMember(dest => dest.Age, option =>
                {
                    option.MapFrom(src => src.DateOfBirth.CalculateAge());
                });
            CreateMap<User, UserForDetailsDTO>()
                .ForMember(dest => dest.Age, option =>
                {
                    option.MapFrom(src => src.DateOfBirth.CalculateAge());
                });

            CreateMap<Post, PostDTO>();
            CreateMap<Image, ImageDTO>();

            CreateMap<Post, PostForListDTO>();
            CreateMap<Image, PostImageForListDTO>();

            CreateMap<UserLikePost, LikedPostDTO>();

            CreateMap<UserForUpdateDTO, User>();
        }
    }
}