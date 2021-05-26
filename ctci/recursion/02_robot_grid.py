'''
- backtracking
- go right until either a wall is hit or an obstacle is hit
- if an obstacle is hit, backtrackto previous spot, just pop off the stack
- the stack is a list of valid moves when we add a new move and its blocked we simply pop it off and go back to the last one
'''


def get_path(maze):
    if not maze:
        return None
    path = []
    # we use -1 to get indexs of the col and row
    # this is starting at the bottom right corner, it doesnt matter that you start there because its all about finding the path
    if is_path(maze, len(maze) - 1, len(maze[0]) - 1, path):
        return path
    return None


def is_path(maze, row, col, path):
    # check if its out of bounds
    # base case
    if col < 0 or row < 0 or not maze[row][col]:
        return False

    is_at_origin = (row == 0) and (col == 0)

    # divide and conquer, moving either up or left
    if (is_at_origin
            or is_path(maze, row, col-1, path)
            or is_path(maze, row-1, col, path)
        ):
        point = (row, col)
        path.append(point)
        return True
    return False


# Memoization = bottom up
def get_path_memoized(maze):
    if not maze:
        return None
    path = []
    failed_points = set()
    if is_path_memoized(maze, len(maze)-1, len(maze[0])-1, path, failed_points):
        return path
    return None


def is_path_memoized(maze, row, col, path, failed_points):
    if col < 0 or row < 0 or not maze[row][col]:
        return False

    point = (row, col)

    if point in failed_points:
        return False

    is_at_origin = row == 0 and col == 0

    # reminds me of visited in spanning tree or breadth first search
    if point in failed_points:
        return False

    if (is_at_origin
        or is_path_memoized(maze, row, col-1, path, failed_points)
        or is_path_memoized(maze, row-1, col, path, failed_points)
        ):
        path.append(point)
        return True

    failed_points.append(point)
    return True


if __name__ == "__main__":
    print(get_path([[True, True], [True, True]]))
    print(
        get_path([[True, True, True], [False, True, False], [True, True, True]]))
    print(get_path_memoized([[True, True], [False, True]]))
