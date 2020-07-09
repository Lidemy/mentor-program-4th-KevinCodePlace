i=1
while [ "${i}" -le "$1" ]

do
	touch "$i.js"
	i=$(($i+1))
done
echo "檔案建立完成"