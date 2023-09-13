def selectionsort( aList ):
  	for i in range( len( aList ) ):
    	least = i
    	for k in range( i + 1 , len( aList ) ):
      		if aList[k] < aList[least]:
        	least = k
 
  	  	swap( aList, least, i )