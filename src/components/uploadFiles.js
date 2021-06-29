import React, { Component } from "react";
import http from "../httpCommon";




export default class UploadFiles extends Component {
    constructor(props) {
        super(props);
        this.selectFiles = this.selectFiles.bind(this);
        this.upload = this.upload.bind(this);
        this.uploadFiles = this.uploadFiles.bind(this);
    
        this.state = {
          selectedFiles: undefined,
          progressInfos: [],
          transeInfos: [],
          message: [],
          fileInfos: [],
          data: [],
          uploadUrl: "",
          uploadFileKey: "",
          accessToken: 'udczemak62bqhknj', //api 토큰을 지정하면 됩니다. 해당 토큰은 vod콘솔 설정 페이지에 있습니다. 필수 o
       
          
        };
      }


      

      componentDidMount() {
        // let data = {
        //   'expire_time': 600, // 값의 범위는 0 < expire_time <= 21600 입니다. 빈값을 보내거나 항목 자체를 제거하면 기본 600초로 설정됩니다.
        //   'category_key': '', // 업로드한 파일이 속할 카테고리의 키(API를 이용하여 확득 가능)입니다. 빈값을 보내거나 항목 자체를 제거하면 '없음'에 속합니다.
        //   'title': '{title}', // 입력한 제목을 컨텐츠의 제목으로 강제지정합니다. 이 값을 보내지 않거나 빈값으로 보내면 기본적으로 파일명이 제목으로 사용됩니다.
        //   'is_encryption_upload': 0, // 0은 일반 업로드, 1은 암호화 업로드입니다. 암호화 업로드시 파일이 암호화 되어 Kollus의 전용 플레이어로만 재생됩니다.
        //   'is_audio_upload': 0, // 0은 일반 업로드, 1은 암호화 업로드입니다. 암호화 업로드시 파일이 암호화 되어 Kollus의 전용 플레이어로만 재생됩니다.
        //   'is_passthrough': 1,  //1은 passthrough 업로드,  0은 일반 업로드 입니다.
        //   'profile_key': 'hikim-tv-full-hd-1' //is_passthrough가 1인 경우 의미가 있습니다. (profile_key={계정명}-pc-high) 설정->고급기능->인코딩 프로파일에서 확인가능합니다.
        // }

        let formBody = new FormData()
        // const params = new URLSearchParams();
        formBody.append('expire_time', 600)// 값의 범위는 0 < expire_time <= 21600 입니다. 빈값을 보내거나 항목 자체를 제거하면 기본 600초로 설정됩니다.
        formBody.append('category_key', '') // 업로드한 파일이 속할 카테고리의 키(API를 이용하여 확득 가능)입니다. 빈값을 보내거나 항목 자체를 제거하면 '없음'에 속합니다.
        formBody.append('title', 'formBodyTest') // 입력한 제목을 컨텐츠의 제목으로 강제지정합니다. 이 값을 보내지 않거나 빈값으로 보내면 기본적으로 파일명이 제목으로 사용됩니다.
        formBody.append('is_encryption_upload', 1) // 0은 일반 업로드, 1은 암호화 업로드입니다. 암호화 업로드시 파일이 암호화 되어 Kollus의 전용 플레이어로만 재생됩니다.
        formBody.append('is_audio_upload', 0) // 0은 비디오 업로드, 1은 음원 파일 업로드 입니다.
        formBody.append('is_passthrough', 1)  //1은 passthrough 업로드,  0은 일반 업로드 입니다.
        formBody.append('profile_key', 'hikim-pc1-hd') //is_passthrough가 1인 경우 의미가 있습니다. (profile_key={계정명}-pc-high) 설정->고급기능->인코딩 프로파일에서 확인가능합니다.

        http.post(`http://upload.kr.kollus.com/api/v1/create_url?access_token=${this.state.accessToken}`, formBody, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }      
        )
        .then((response) => {
          console.log(response)
          this.setState({
            uploadUrl: response.data.result.upload_url, //실질적으로 업로드 할 수 있는 URL입니다. 해당 URL로 영상 파일을 업로드 할 수 있습니다. 
            uploadFileKey: response.data.result.upload_file_key// 업로드 파일 키입니다. 
          })
          console.log(this.state.uploadFileKey)
       })
                        
      }

   
    
    //   urlencodeFormData(fd){
    //     var s = '';
    //     function encode(s){ return encodeURIComponent(s).replace(/%20/g,'+'); }
    //     for(var pair of fd.entries()){
    //         if(typeof pair[1]=='string'){
    //             s += (s?'&':'') + encode(pair[0])+'='+encode(pair[1]);
    //         }
    //     }
    //     return s;
    // }


    
      selectFiles(event) {
        this.setState({
          progressInfos: [],
          selectedFiles: event.target.files,
          transeInfos: [],
        });
      }


    
      upload(idx, file) {
        let _progressInfos = [...this.state.progressInfos];
        let onUploadProgress = (file) => {
          _progressInfos[idx].percentage = Math.round((100 * file.loaded) / file.total);
          this.setState({
            _progressInfos,
          });
          }

        let formData = new FormData();
      

        formData.append("upload-file", file);
        formData.append("accept","application/json");

          // console.log(response);
     
       
         http.post(`${this.state.uploadUrl}`, formData,
          {
           headers: {
             "Content-Type": "multipart/form-data",
           },
           onUploadProgress})
           .then((res) => {         


           }, (error) => {
             console.log(error)
           }
           )   
                     
      }

     
    
      uploadFiles() {
        const selectedFiles = this.state.selectedFiles;
        
        let _transeInfos = [];
        let _progressInfos = [];
    
        for (let i = 0; i < selectedFiles.length; i++) {
          _progressInfos.push({ percentage: 0, fileName: selectedFiles[i].name });
          _transeInfos.push({ percentage: 0, fileName: selectedFiles[i].name });
        }
    
        this.setState(
          {
            progressInfos: _progressInfos,
            transeInfos: _transeInfos,
            message: [],
          },
          () => {
            for (let i = 0; i < selectedFiles.length; i++) {
              this.upload(i, selectedFiles[i]);
            }
          }
        );
      }

     
    
      render() {
        const { selectedFiles, progressInfos, message} = this.state;
        
        return (
          
          <div>

            {progressInfos &&
              progressInfos.map((progressInfo, index) => (
                <div className="mb-2" key={index}>
                  <span>{progressInfo.fileName}</span>
                  <div className="progress">
                    <div
                      className="progress-bar progress-bar-info"
                      role="progressbar"
                      aria-valuenow={progressInfo.percentage}
                      aria-valuemin="0"
                      aria-valuemax="100"
                      style={{ width: progressInfo.percentage + "%" }}
                    >
                      {progressInfo.percentage}%
                    </div>
                  </div>
                </div>
              ))}
    
            <div className="row my-3">
              <div className="col-8">
                <label className="btn btn-default p-0">
                  <input type="file" id="upload-file" multiple onChange={this.selectFiles} />
                </label>
              </div>
    
              <div className="col-4">
                <button
                  className="btn btn-success btn-sm"
                  disabled={!selectedFiles}
                  onClick={this.uploadFiles}
                >
                  Upload
                </button>
              </div>
            </div>
    
            {message.length > 0 && (
              <div className="alert alert-secondary" role="alert">
                <ul>
                  {message.map((item, i) => {
                    return <li key={i}>{item}</li>;
                  })}
                </ul>
              </div>
            )}
           


    
    
            {message.length > 0 && (
              <div className="alert alert-secondary" role="alert">
                <ul>
                  {message.map((item, i) => {
                    return <li key={i}>{item}트렌스 코딩 완료</li>;
                  })}
                </ul>
              </div>
            )}
            
                  
          </div>



                    
        );
      }
}