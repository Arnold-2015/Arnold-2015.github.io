//getStyle方法封装
function getStyle ( obj, attr ) { return obj.currentStyle?obj.currentStyle[attr] : getComputedStyle( obj )[attr]; }



//匀速运动doMove函数封装
function doMove ( obj, attr, dir, target, endFn ) {
	dir = parseInt(getStyle( obj, attr )) < target ? dir : -dir;
	clearInterval( obj.timer );
	obj.timer = setInterval(function () {
		var speed = parseInt(getStyle( obj, attr )) + dir;			// 步长
		if ( speed > target && dir > 0 ||  speed < target && dir < 0  ) {
			speed = target;
		}
		obj.style[attr] = speed + 'px';
		if ( speed == target ) {
			clearInterval( obj.timer );
			endFn && endFn();
		}
	}, 30);
}




//缓冲运动startMove函数封装
function startMove ( obj, attr, target, endFn ) {
	clearInterval( obj.timer );
	obj.timer = setInterval(function () {
		//取值
		var iCur=0;
		if(attr=='opacity'){
			iCur=parseInt(100*parseFloat(getStyle( obj, attr )));
		}
		else{
			iCur=parseInt(getStyle( obj, attr ));
		}
		//计算速度
		var iSpeed = (target-iCur)/8;			// 速度
		iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
		//判断停止
		if ( iCur == target ) {
			clearInterval( obj.timer );
			// if ( endFn ) {endFn();}
			endFn && endFn();
		}
		else{

			if(attr=='opacity'){
				obj.style.filter ='alpha(opacity:'+(iCur+iSpeed)+')';
				obj.style.opacity=(iCur+iSpeed)/100;
			}
			else{
				obj.style[attr] = iCur+iSpeed + 'px';
			}
		}
	}, 30);
}




//完美运动perfectMove函数封装
function perfectMove ( obj, json, endFn ) {
	clearInterval( obj.timer );
	obj.timer = setInterval(function ()	 {
		var bStop=true;//值皆达到，循环结束
		for(var attr in json){
			//取值
			var iCur=0;
			if(attr=='opacity'){
				iCur=parseInt(100*parseFloat(getStyle( obj, attr )));
			}
			else{
				iCur=parseInt(getStyle( obj, attr ));
			}
			//计算速度
			var iSpeed = (json[attr]-iCur)/8;			// 速度
			iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
			//判断停止
			if ( iCur != json[attr] ) {
				bStop=false;
			}
				if(attr=='opacity'){
					obj.style.filter ='alpha(opacity:'+(iCur+iSpeed)+')';
					obj.style.opacity=(iCur+iSpeed)/100;
				}
				else{
					obj.style[attr] = iCur+iSpeed + 'px';
				}
		}
		if(bStop){
			 clearInterval( obj.timer );
	         endFn && endFn();
		 }
	}, 30);
}




//弹性运动elasticMove函数封装
function elasticMove ( obj, target,attr) {
	clearInterval( obj.timer );
	var iSpeed=0;
	var tmp=0;
	obj.timer = setInterval(function () {
			var iCur=parseInt(getStyle( obj, attr ));
		iSpeed +=(target-iCur)/5;
		iSpeed *=0.7;
		tmp+=iSpeed;
		if(Math.abs(iSpeed)<1&&Math.abs(tmp-target)<1) {
			clearInterval( obj.timer );
			obj.style[attr]=target+'px';
		}
			else{
				obj.style[attr] = tmp+ 'px';
			}

	}, 30);
}



//抖动函数封装
function shake (obj,attr,endFn){
	var pos=parseInt(getStyle(obj,attr));
	var num=0;
	var arr=[];

	for(var i=20;i>0;i-=2){
		arr.push(i,-i);
	}
	arr.push(0);
	clearInterval(obj.shake);
	obj.shake=setInterval(function(){
		obj.style[attr]=pos+arr[num]+'px';
		num++;
		if(num===arr.length){clearInterval(obj.shake);endFn&&endFn();}
	},30)
}



//拖拽函数封装 磁性吸附(改变临界值)
function drag(obj) {

	obj.onmousedown = function(ev) {
		var ev = ev || event;

		var disX = ev.clientX - this.offsetLeft;
		var disY = ev.clientY - this.offsetTop;

		if ( obj.setCapture ) {
			obj.setCapture();
		}

		document.onmousemove = function(ev) {
			var ev = ev || event;

			var L = ev.clientX - disX;
			var T = ev.clientY - disY;

			if ( L < 0 ) {
				L = 0;
			} else if ( L> document.documentElement.clientWidth - obj.offsetWidth ) {
				L = document.documentElement.clientWidth - obj.offsetWidth;
			}

			if ( T < 0 ) {
				T = 0;
			} else if ( T > document.documentElement.clientHeight - obj.offsetHeight ) {
				T = document.documentElement.clientHeight - obj.offsetHeight;
			}

			obj.style.left = L + 'px';
			obj.style.top = T + 'px';

		}

		document.onmouseup = function() {
			document.onmousemove = document.onmouseup = null;
			if ( obj.releaseCapture ) {
				obj.releaseCapture();
			}
		}
		return false;
	}
}


//通过类名获取元素
function getByClass(claName){
	var result=[];
	aElements=document.getElementsByTagName('*');
	for(var i=0;i<aElements.length;i++){
		if(aElements[i].className==claName)
		{
			result.push(aElements[i])
		}
	}
	return result;
}