
# TODO

- DOM recycling dom node, take ones that are out of view and reuse them
- pay attention to relayout and repaint
- In order to get the desired height we will use a 1px by 1px sentinel element
  then use transform to get it to the desired height
- promote eveery element in the runway to their own layer... How is this done?
- we need to make sure our runway has no styles else our graphics card will crate a texture of a coouple 
  thousand pixels in height
- check if viewport has come sufficiently close to the end of the runway. if so move the sentinal
- then move the items that no longer in the viewport to the bottom of the runway and populate then with new content
