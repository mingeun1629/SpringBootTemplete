package com.dmonster.reward.api;

import java.util.Collection;
import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter 
@Setter 
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ResVo {
	private String result;
	private String resultDetail;
	private int statusCode;
	private String status;
	private String dataType;
	private Object data;
	
	//요청 성공시
	public ResponseEntity<?> success(Object data) {
		
		ResVo resVo = ResVo.builder()
				.result("SUCCESS")
				.resultDetail("SUCCESS")
				.statusCode(200)
				.status(HttpStatus.valueOf(200).getReasonPhrase())
				.dataType(getObjectType(data))
				.data(data).build();

		return new ResponseEntity<>(sortresVo(resVo), HttpStatus.valueOf(200));
	}
	
	//요청 성공 with 메세지
	public ResponseEntity<?> success(Object data, String resultDetail) {
		ResVo resVo = ResVo.builder()
				.result("SUCCESS")
				.resultDetail(resultDetail)
				.statusCode(200)
				.status(HttpStatus.valueOf(200).getReasonPhrase())
				.dataType(getObjectType(data))
				.data(data).build();

		return new ResponseEntity<>(sortresVo(resVo), HttpStatus.valueOf(200));
	}
	
	//요청 실패시
	public ResponseEntity<?> fail(int StatusCode, String FailReason) {
		
		ResVo resVo = ResVo.builder()
				.result("FAIL")
				.resultDetail(FailReason)
				.statusCode(StatusCode)
				.status(HttpStatus.valueOf(StatusCode).getReasonPhrase())
				.dataType("String")
				.data("")
				.build();

		return new ResponseEntity<>(sortresVo(resVo), HttpStatus.valueOf(StatusCode));
	}
	
	//요청 실패시2
	public ResponseEntity<?> fail() {
		
		ResVo resVo = ResVo.builder()
				.result("FAIL")
				.resultDetail("Unprocessed Request")
				.statusCode(400)
				.status(HttpStatus.valueOf(400).getReasonPhrase())
				.dataType("String")
				.data("").build();
		
		return new ResponseEntity<>(sortresVo(resVo), HttpStatus.valueOf(400));
	}
	
	//데이터 정렬후 전송
	private LinkedHashMap<String, Object> sortresVo(ResVo resVo){
		LinkedHashMap<String, Object> map = new LinkedHashMap<>();
		map.put("result", resVo.result);
		map.put("resultDetail", resVo.resultDetail);
		map.put("status", resVo.status);
		map.put("statusCode", resVo.statusCode);
		map.put("dataType", resVo.dataType);
		map.put("data", resVo.data);
		return map;
	}
	
	private String getObjectType(Object object) {
		if(object instanceof String){
			return "String";
		}
		else if(object instanceof Integer){
			return "Integer";
		}
		else if(object instanceof Double){
			return "Double";
		}
		else if(object instanceof Map){
			return "Object";
		}
		else if(object instanceof Collection){
			return "Array";
		}
		else if(object.getClass().isArray()){
			return "Array";
		}
		else{
			return "Object";
		}
    }
}
